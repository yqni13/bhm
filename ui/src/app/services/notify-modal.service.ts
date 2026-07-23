import { NotifyModalData } from './../utils/interfaces/notify-modal.interface';
import { computed, effect, inject, Injectable, signal } from "@angular/core";
import { ObservationService } from "./observe.service";

@Injectable({
    providedIn: 'root'
})
export class NotifyModalService {

    private readonly observe = inject(ObservationService);

    readonly notifications = signal<NotifyModalData[]>([]);
    isActive = computed(() => this.notifications().length > 0);

    constructor() {
        effect(() => this.observe.activeModal.set(this.notifications().length > 0));
    }

    notify(notification: NotifyModalData) {
        if(notification.autoClose && !notification.displayTimeInMilliseconds) {
            notification.displayTimeInMilliseconds = 3000;
        }

        const notificationExists = this.notifications().find((entry) => 
            entry.title === notification.title && entry?.text === notification?.text);

        // Only add notifications that doesn't actively exist.
        if(!notificationExists) {
            if(notification.autoClose) {
                notification.displayHandler = setTimeout(
                    () => this.close(notification), notification.displayTimeInMilliseconds ?? 3000
                );
            }
            this.notifications.update(current => [...current, notification]);
        }
    }

    close(notification: NotifyModalData) {
        this.notifications.update(current => current.filter(entry => entry !== notification));
    }
}