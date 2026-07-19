import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    /**
     * 
     * @description Temporary function to simulate authentication.
     */
    isAuthenticated(): boolean {
        return false;
    }
}