import {
  ErrorHandlerService,
  ExtendedUser,
  SupabaseServerNestService,
} from '@hive-builder/core-server';
import { Tables, TablesInsert } from '@hive-builder/hive-db';
import {
  StripeCustomerNestService,
  StripeSubscriptionNestService,
} from '@hive-builder/payment-server';
import { Injectable, Logger } from '@nestjs/common';
import {
  AuthResponse,
  AuthSession,
  AuthTokenResponsePassword,
  User,
} from '@supabase/supabase-js';
import { Request, Response } from 'express';
import Stripe from 'stripe';
import { CreateUserInput } from '../user/dto/create-user.input';
import { UserService } from '../user/user.nest.service';
import { LoginInput } from './dto/login.input';
import { SignupInput } from './dto/signup.input';

@Injectable()
export class AuthSupabaseService {
  private authUser: User | null = null;
  private dbUser: Tables<'users'> | null = null;
  private stripeCustomer: Stripe.Customer | null = null;
  private stripeSubscription: Stripe.Subscription | null = null;

  public constructor(
    private readonly userService: UserService,
    private readonly supabaseClient: SupabaseServerNestService,
    private readonly stripeCustomerServices: StripeCustomerNestService,
    private readonly stripeSubscriptionService: StripeSubscriptionNestService,
    private readonly logger: Logger,
    private readonly errorHandler: ErrorHandlerService,
  ) {}

  public async signup(
    signupInput: SignupInput,
    ctx: { req: Request; res: Response },
  ) {
    try {
      const { user, session }: { user: User; session: AuthSession } =
        await this.createSupabaseAuthUser(signupInput, ctx);

      if (user !== null) {
        this.authUser = user;

        const userModel: TablesInsert<'users'> = CreateUserInput.mapToSupabase(
          signupInput,
          user.id,
        );

        this.stripeCustomer = await this.createStripeCustomer(userModel, user);

        this.dbUser = await this.createDbUser(
          userModel,
          this.stripeCustomer,
          ctx,
        );

        this.stripeSubscription = await this.createUserFreeSubscription(
          this.stripeCustomer,
          ctx,
        );

        return {
          authSession: session,
          authUser: user,
          user: this.dbUser,
        };
      }
    } catch (error) {
      await this.rollback();
      throw error;
    }

    return null;
  }

  public async login(
    loginInput: LoginInput,
    ctx: { req: Request; res: Response },
  ) {
    const { error, data }: AuthTokenResponsePassword = await this.supabaseClient
      .getSupabaseClient({ req: ctx.req })
      .auth.signInWithPassword({
        email: loginInput.email,
        password: loginInput.password,
      });

    if (error != null) {
      this.errorHandler.handleError(error);
    }

    if (data?.user !== null) {
      this.logger.log('Supabase auth user Has Logged In ', data.user.email);

      await this.supabaseClient.updateSupabaseAuthSession(
        data.session.refresh_token,
        data.session.access_token,
        ctx.req as Request & { user?: ExtendedUser },
      );

      const dbUser: Tables<'users'> = await this.userService.findOne(
        data.user.id,
        ctx,
      );

      this.logger.log('User Found in DB', JSON.stringify(dbUser.id));
      return {
        authSession: data.session,
        authUser: data.user,
        user: dbUser,
      };
    }

    return null;
  }

  private async createUserFreeSubscription(
    stripeCustomer: Stripe.Customer,
    ctx: { req: Request; res: Response },
  ) {
    const stripeSubscription: Stripe.Subscription =
      await this.stripeSubscriptionService.createFreeSubscription({
        customerId: stripeCustomer.id,
        ctx,
      });

    this.logger.log(
      'Stripe subscription created',
      JSON.stringify(stripeSubscription),
    );

    return stripeSubscription;
  }

  private async createDbUser(
    userModel: TablesInsert<'users'>,
    stripeCustomer: Stripe.Customer,
    ctx: { req: Request; res: Response },
  ) {
    const dbUser: Tables<'users'> = await this.userService.create(
      {
        ...userModel,
        stripe_customer_id: stripeCustomer.id,
      },
      ctx,
    );

    this.logger.log('User created', JSON.stringify(dbUser));
    return dbUser;
  }

  private async createStripeCustomer(
    userModel: TablesInsert<'users'>,
    user: User,
  ) {
    const stripeCustomer: Stripe.Customer =
      await this.stripeCustomerServices.create({
        displayName: userModel.full_name ?? '',
        email: user.email ?? '',
        phone: user.phone ?? '',
      });

    this.logger.log('Stripe customer created', stripeCustomer.id);

    return stripeCustomer;
  }

  private async createSupabaseAuthUser(
    signupInput: SignupInput,
    ctx: { req: Request; res: Response },
  ) {
    const { error, data }: AuthResponse = await this.supabaseClient
      .getSupabaseClient({ req: ctx.req })
      .auth.signUp({
        email: signupInput.email,
        password: signupInput.password,
        phone: signupInput.phone,
      });

    if (error != null) {
      this.errorHandler.handleError(error);
    }

    this.logger.log('Supabase auth user has been added', data.user?.id);

    return { user: data.user as User, session: data.session as AuthSession };
  }

  private async rollback() {
    if (this.authUser) {
      // await this.supabaseClient.auth.admin.deleteUser(this.authUser.id);
      this.logger.log('Supabase auth user has been deleted', this.authUser.id);
    }

    if (this.stripeCustomer) {
      // await this.stripeCustomerServices.remove(this.stripeCustomer.id);
      this.logger.log(
        'Stripe customer has been deleted',
        this.stripeCustomer.id,
      );
    }

    if (this.dbUser) {
      // await this.userService.remove(this.dbUser.id);
      this.logger.log('User has been deleted', this.dbUser.id);
    }

    if (this.stripeSubscription) {
      // await this.stripeSubscriptionService.remove(this.stripeSubscription.id);
      this.logger.log(
        'Stripe subscription has been deleted',
        this.stripeSubscription.id,
      );
    }
  }
}
