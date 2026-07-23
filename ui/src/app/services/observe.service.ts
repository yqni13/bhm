import { Injectable, signal } from "@angular/core";
import { DeviceType } from "../utils/enums/device-option.enum";

@Injectable({
    providedIn: 'root'
})
export class ObservationService {

    /**
     * @description Observe if ANY modal is active as this value is used to hide indicators or other components.
     */
    readonly activeModal = signal(false);

    /**
     * @description Observe for active device option (seperate service not necessary).
     */
    readonly activeDevice = signal<DeviceType>(DeviceType.DESKTOP);

}