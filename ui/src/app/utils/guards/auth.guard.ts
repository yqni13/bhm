import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { BaseRoute } from "../routes/base.route.enum";
import { AuthService } from "../services/auth.service";

export const authGuard: CanActivateFn = () => {
    const router = inject(Router);
    const auth = inject(AuthService);

    if(auth.isAuthenticated()) {
        return true;
    }
    router.navigate(['/' + BaseRoute.LOGIN]);
    return false;
}