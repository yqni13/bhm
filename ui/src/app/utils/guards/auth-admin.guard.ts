import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";

export const AuthAdminGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    console.log("AuthAdminGuard, route: ", route);
    console.log("AuthAdminGuard, state: ", state);
    // inject auth service
    // return authService.isAuthenticated();

    const router = inject(Router);
    const demoAdminLogin = false;
    if(demoAdminLogin) {
        return true;
    } else {
        // call logout() => call navigation to login page
        router.navigate(['/login']);
        return false;
    }
}