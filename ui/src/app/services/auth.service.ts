import { computed, Injectable, signal } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private status = signal(false);
    isAuthenticated = computed(() => this.status());

    /**
     * @description Method to manually set authentication status (TESTING ONLY).
     */
    setStatus(value: boolean) {
        this.status.set(value);
    }
}