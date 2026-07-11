import { Routes } from '@angular/router';
import { AuthUserGuard } from './utils/guards/auth-user.guard';
import { BaseRoute } from './utils/routes/base.route.enum';

export const routes: Routes = [
    {
        path: '',
        redirectTo: BaseRoute.HOME,
        pathMatch: 'full'
    },
    {
        // Always navigate to login when authentication fails and load lazily (loadComponent())
        path: BaseRoute.LOGIN,
        data: { title: 'login', location: 'navbar', icon: 'icon-Login', hideNav: true },
        loadComponent: () => import('./components/pages/login/login.component').then(page => page.LoginComponent)
    },
    {
        path: BaseRoute.HOME,
        loadComponent: () => import('./components/pages/home/home.component').then(page => page.HomeComponent)
    },
    {
        path: BaseRoute.INIT,
        data: { title: 'init', location: 'footer', icon: 'icon-Init' },
        canActivate: [AuthUserGuard],
        loadComponent: () => import('./components/pages/init/init.component').then(page => page.InitComponent)
    },
    {
        path: '**',
        redirectTo: BaseRoute.LOGIN
    }
];

/**
 * See more for accessing routes with guards (like children => user, user:id, ...) on documentation:
 * https://angular.dev/guide/routing/route-guards
 */
