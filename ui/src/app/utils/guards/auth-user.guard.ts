import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";

export const AuthUserGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    console.log("AuthUserGuard, route: ", route);
    console.log("AuthUserGuard, state: ", state);
    // inject auth service
    // return authService.isAuthenticated();

    const router = inject(Router);
    const demoLogin = false;
    if(demoLogin) {
        return true;
    } else {
        // call logout() => call navigation to login page
        router.navigate(['/login']);
        return false;
    }
}