drop policy "Allow public read-only access." on "public"."prices";

drop policy "Allow public read-only access." on "public"."products";

revoke delete on table "public"."prices" from "anon";

revoke insert on table "public"."prices" from "anon";

revoke references on table "public"."prices" from "anon";

revoke select on table "public"."prices" from "anon";

revoke trigger on table "public"."prices" from "anon";

revoke truncate on table "public"."prices" from "anon";

revoke update on table "public"."prices" from "anon";

revoke delete on table "public"."prices" from "authenticated";

revoke insert on table "public"."prices" from "authenticated";

revoke references on table "public"."prices" from "authenticated";

revoke select on table "public"."prices" from "authenticated";

revoke trigger on table "public"."prices" from "authenticated";

revoke truncate on table "public"."prices" from "authenticated";

revoke update on table "public"."prices" from "authenticated";

revoke delete on table "public"."prices" from "service_role";

revoke insert on table "public"."prices" from "service_role";

revoke references on table "public"."prices" from "service_role";

revoke select on table "public"."prices" from "service_role";

revoke trigger on table "public"."prices" from "service_role";

revoke truncate on table "public"."prices" from "service_role";

revoke update on table "public"."prices" from "service_role";

revoke delete on table "public"."products" from "anon";

revoke insert on table "public"."products" from "anon";

revoke references on table "public"."products" from "anon";

revoke select on table "public"."products" from "anon";

revoke trigger on table "public"."products" from "anon";

revoke truncate on table "public"."products" from "anon";

revoke update on table "public"."products" from "anon";

revoke delete on table "public"."products" from "authenticated";

revoke insert on table "public"."products" from "authenticated";

revoke references on table "public"."products" from "authenticated";

revoke select on table "public"."products" from "authenticated";

revoke trigger on table "public"."products" from "authenticated";

revoke truncate on table "public"."products" from "authenticated";

revoke update on table "public"."products" from "authenticated";

revoke delete on table "public"."products" from "service_role";

revoke insert on table "public"."products" from "service_role";

revoke references on table "public"."products" from "service_role";

revoke select on table "public"."products" from "service_role";

revoke trigger on table "public"."products" from "service_role";

revoke truncate on table "public"."products" from "service_role";

revoke update on table "public"."products" from "service_role";

alter table "public"."prices" drop constraint "prices_currency_check";

alter table "public"."prices" drop constraint "prices_product_id_fkey";

alter table "public"."subscriptions" drop constraint "subscriptions_price_id_fkey";

alter table "public"."prices" drop constraint "prices_pkey";

alter table "public"."products" drop constraint "products_pkey";

drop index if exists "public"."prices_pkey";

drop index if exists "public"."products_pkey";

drop table "public"."prices";

drop table "public"."products";

create table "public"."stripe_product_prices" (
    "id" text not null,
    "product_id" text,
    "active" boolean,
    "description" text,
    "unit_amount" bigint,
    "currency" text,
    "type" pricing_type,
    "interval" pricing_plan_interval,
    "interval_count" integer,
    "trial_period_days" integer,
    "metadata" jsonb
);


alter table "public"."stripe_product_prices" enable row level security;

create table "public"."stripe_products" (
    "id" text not null,
    "active" boolean,
    "name" text,
    "description" text,
    "image" text,
    "metadata" jsonb,
    "stripe_product_id" text not null
);


alter table "public"."stripe_products" enable row level security;

CREATE UNIQUE INDEX prices_pkey ON public.stripe_product_prices USING btree (id);

CREATE UNIQUE INDEX products_pkey ON public.stripe_products USING btree (id);

alter table "public"."stripe_product_prices" add constraint "prices_pkey" PRIMARY KEY using index "prices_pkey";

alter table "public"."stripe_products" add constraint "products_pkey" PRIMARY KEY using index "products_pkey";

alter table "public"."stripe_product_prices" add constraint "prices_currency_check" CHECK ((char_length(currency) = 3)) not valid;

alter table "public"."stripe_product_prices" validate constraint "prices_currency_check";

alter table "public"."stripe_product_prices" add constraint "prices_product_id_fkey" FOREIGN KEY (product_id) REFERENCES stripe_products(id) not valid;

alter table "public"."stripe_product_prices" validate constraint "prices_product_id_fkey";

alter table "public"."subscriptions" add constraint "subscriptions_price_id_fkey" FOREIGN KEY (price_id) REFERENCES stripe_product_prices(id) not valid;

alter table "public"."subscriptions" validate constraint "subscriptions_price_id_fkey";

grant delete on table "public"."stripe_product_prices" to "anon";

grant insert on table "public"."stripe_product_prices" to "anon";

grant references on table "public"."stripe_product_prices" to "anon";

grant select on table "public"."stripe_product_prices" to "anon";

grant trigger on table "public"."stripe_product_prices" to "anon";

grant truncate on table "public"."stripe_product_prices" to "anon";

grant update on table "public"."stripe_product_prices" to "anon";

grant delete on table "public"."stripe_product_prices" to "authenticated";

grant insert on table "public"."stripe_product_prices" to "authenticated";

grant references on table "public"."stripe_product_prices" to "authenticated";

grant select on table "public"."stripe_product_prices" to "authenticated";

grant trigger on table "public"."stripe_product_prices" to "authenticated";

grant truncate on table "public"."stripe_product_prices" to "authenticated";

grant update on table "public"."stripe_product_prices" to "authenticated";

grant delete on table "public"."stripe_product_prices" to "service_role";

grant insert on table "public"."stripe_product_prices" to "service_role";

grant references on table "public"."stripe_product_prices" to "service_role";

grant select on table "public"."stripe_product_prices" to "service_role";

grant trigger on table "public"."stripe_product_prices" to "service_role";

grant truncate on table "public"."stripe_product_prices" to "service_role";

grant update on table "public"."stripe_product_prices" to "service_role";

grant delete on table "public"."stripe_products" to "anon";

grant insert on table "public"."stripe_products" to "anon";

grant references on table "public"."stripe_products" to "anon";

grant select on table "public"."stripe_products" to "anon";

grant trigger on table "public"."stripe_products" to "anon";

grant truncate on table "public"."stripe_products" to "anon";

grant update on table "public"."stripe_products" to "anon";

grant delete on table "public"."stripe_products" to "authenticated";

grant insert on table "public"."stripe_products" to "authenticated";

grant references on table "public"."stripe_products" to "authenticated";

grant select on table "public"."stripe_products" to "authenticated";

grant trigger on table "public"."stripe_products" to "authenticated";

grant truncate on table "public"."stripe_products" to "authenticated";

grant update on table "public"."stripe_products" to "authenticated";

grant delete on table "public"."stripe_products" to "service_role";

grant insert on table "public"."stripe_products" to "service_role";

grant references on table "public"."stripe_products" to "service_role";

grant select on table "public"."stripe_products" to "service_role";

grant trigger on table "public"."stripe_products" to "service_role";

grant truncate on table "public"."stripe_products" to "service_role";

grant update on table "public"."stripe_products" to "service_role";

create policy "Allow public read-only access."
on "public"."stripe_product_prices"
as permissive
for select
to public
using (true);


create policy "Allow public read-only access."
on "public"."stripe_products"
as permissive
for select
to public
using (true);



