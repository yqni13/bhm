/* eslint-disable @typescript-eslint/no-explicit-any */
import { DeviceOption } from "../enums/device.enum"
import { SupportOption } from "../enums/ticket-option.support.enum"

export interface SupportTicketData {
    attachment?: any[],
    userEmail: string,
    option: SupportOption,
    title: string,
    message: string,
    device?: DeviceOption,
    os?: string,
    browser?: string,
}

export interface SupportFeedbackData {
    userEmail: string,
    option: SupportOption,
    rating: number,
    termFeedback: boolean,
    message?: string
}

/**
 * @description Extend params to overwrite data when initiating form (initEdit()).
 */
export interface SupportInitEditParams {
    option?: SupportOption
}

export interface SupportFormData {
    attachment?: any[],
    userEmail: string,
    option: SupportOption,
    title?: string,
    message?: string,
    device?: DeviceOption,
    os?: string,
    browser?: string,
    rating?: number,
    termFeedback?: boolean,
}