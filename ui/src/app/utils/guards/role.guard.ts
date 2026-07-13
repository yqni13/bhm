import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { RoleOption } from "../enums/role.enum";
import { BaseRoute } from "../routes/base.route.enum";

export const roleGuard: CanActivateFn = (route) => {
    const router = inject(Router);

    const allowedRoles = route.data?.['roles'] as RoleOption[] | null;
    if(!allowedRoles || allowedRoles.length < 1) {
        return true;
    }

    const userRole = RoleOption.USER; // TODO(yqni13): get role from JWT payload
    if(userRole && allowedRoles.includes(userRole)) {
        return true;
    }

    router.navigate(['/' + BaseRoute.HOME]);
    return false;
}