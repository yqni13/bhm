import { NotifyModalType } from "../enums/notify-modal.enum";

export interface NotifyModalData {
    title: string,
    text?: string,
    phone?: string,
    mail?: string,
    autoClose?: boolean,
    type: NotifyModalType,
    displayTimeInMilliseconds?: number,
    displayHandler?: unknown
}