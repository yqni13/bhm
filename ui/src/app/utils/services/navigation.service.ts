/* eslint-disable @typescript-eslint/no-explicit-any */
import { inject, Injectable } from "@angular/core";
import { Route, Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class NavigationService {

    private readonly router = inject(Router);

    navTo(route: string) {
        console.log("NavigationService, route: ", route);
        this.router.navigate([route]);
    }

    getNavigationRoutes(): Route[] {
        return this.router.config
            .flatMap((route: any) => [route, ...(route.children || [])])
            .filter((route: any) => route.data?.['location'] === 'navbar');
    }

    getFooterRoutes(): Route[] {
        return this.router.config
            .flatMap((route: any) => [route, ...(route.children || [])])
            .filter((route: any) => route.data?.['location'] === 'footer');
    }
}