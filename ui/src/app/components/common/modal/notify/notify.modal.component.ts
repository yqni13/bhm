import { CommonModule } from "@angular/common";
import { Component, inject, input } from "@angular/core";
import { NotifyModalService } from "../../../../services/notify-modal.service";
import { NotifyModalData } from "../../../../utils/interfaces/notify-modal.interface";
import { TranslatePipe } from "@ngx-translate/core";

@Component({
    selector: 'app-notify-modal',
    imports: [
        CommonModule,
        TranslatePipe
    ],
    templateUrl: './notify.modal.component.html',
    styleUrl: './notify.modal.component.scss',
    host: {
        '(document:keydown.escape)': 'closeOnEscape()'
    }
})
export class NotifyModalComponent {

    readonly notifyModal = inject(NotifyModalService);

    notification = input.required<NotifyModalData>();

    closeOnEscape() {
        if(this.notifyModal.isActive() && !this.notification().autoClose) {
            this.notifyModal.close(this.notification());
        }
    }
}