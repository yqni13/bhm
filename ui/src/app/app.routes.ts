import { Routes } from '@angular/router';
import { authGuard } from './utils/guards/auth.guard';
import { BaseRoute } from './utils/routes/base.route.enum';
import { AuthLayoutComponent } from './components/layout/auth/auth.layout.component';
import { LoginComponent } from './components/pages/login/login.component';
import { MainLayoutComponent } from './components/layout/main/main.layout.component';
import { HomeComponent } from './components/pages/home/home.component';
import { InitComponent } from './components/pages/init/init.component';
import { noAuthGuard } from './utils/guards/no-auth.guard';
import { RoleOption } from './utils/enums/role.enum';
import { roleGuard } from './utils/guards/role.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: BaseRoute.HOME,
        pathMatch: 'full'
    },
    {
        path: '',
        component: AuthLayoutComponent,
        canActivate: [ noAuthGuard, roleGuard ],
        children: [
            {
                path: BaseRoute.LOGIN,
                component: LoginComponent,
            }
        ]
    },
    {
        path: '',
        component: MainLayoutComponent,
        canActivate: [ authGuard, roleGuard ],
        children: [
            {
                path: BaseRoute.HOME,
                component: HomeComponent,
            },
            {
                path: BaseRoute.INIT,
                component: InitComponent,
                data: { 
                    title: 'init',
                    location: 'navbar',
                    icon: 'icon-Init',
                    roles: [ RoleOption.ADMIN, RoleOption.USER ]
                }
            }
        ]
    },
    {
        path: '**',
        redirectTo: BaseRoute.HOME
    }
];