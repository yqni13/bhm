import { Component, input, output } from "@angular/core";
import { Field, FieldState } from "@angular/forms/signals";

@Component({
    template: ''
})
export class AbstractInputComponent {

    readonly fieldState = input.required<FieldState<string | number>>();
    readonly fieldName = input.required<string>();
    readonly placeholder = input('');
    readonly ngClass = input('');
    readonly customStyle = input<Record<string, string>>();

    readonly byChange = output<unknown>();

    isFocused = false;

    get field(): Field<string> {
        return this.fieldState().fieldTree as unknown as Field<string>;
    }

    clickOutside(event: MouseEvent) {
        const target = event.target as HTMLElement;
        if(target.id === `custom-form-${this.fieldName}`) {
            this.isFocused = true;
        } else {
            this.isFocused = false;
        }
    }

    tabOutside(event: KeyboardEvent) {
        const target = event.target as HTMLElement;
        if(event.key === 'Tab' && (target.id === `custom-form-${this.fieldName}`)) {
            this.isFocused = false;
        }
    }
}