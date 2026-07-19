import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { BaseRoute } from "../routes/base.route.enum";
import { AuthService } from "../../services/auth.service";

export const noAuthGuard: CanActivateFn = () => {
    const router = inject(Router);
    const auth = inject(AuthService);

    if(auth.isAuthenticated()) {
        router.navigate(['/' + BaseRoute.HOME]);
        return false;
    }
    return true;
}