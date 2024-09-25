import { Route } from '@angular/router';
import { AuthLayoutComponent } from '@hive-builder/layout-web';

export const appRoutes: Route[] = [
  {
    path: 'auth',
    component: AuthLayoutComponent,
    loadChildren: async () =>
      import('@hive-builder/auth-feature-web').then(
        (m: { authWebRoutes: Route[] }) => m.authWebRoutes,
      ),
  },

  // Fallback when no prior routes is matched
  { path: '**', redirectTo: '/auth/login', pathMatch: 'full' },
];
