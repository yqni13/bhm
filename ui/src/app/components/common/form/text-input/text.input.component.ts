import { CommonModule } from "@angular/common";
import { Component, effect, input } from "@angular/core";
import { FormField } from "@angular/forms/signals";
import { AbstractInputComponent } from "../abstract.input.component";
import { ValidationInputComponent } from "../validation/validation.input.component";

@Component({
    selector: 'app-text-input',
    imports: [
        CommonModule,
        FormField,
        ValidationInputComponent
    ],
    templateUrl: './text.input.component.html',
    styleUrls: [
        '../abstract.input.component.scss',
        './text.input.component.scss'
    ],
    host: {
        '(click)': 'clickOutside($event)',
        '(document:keydown)': 'tabOutside($event)'
    }
})
export class TextInputComponent extends AbstractInputComponent {

    readonly inputType = input('text');

    constructor() {
        super();
        effect(() => {
            this.handleInputChanges(this.field().value());
        });
    }

    handleInputChanges(value: string) {
        this.byChange.emit(value);
        this.isFocused = true;
    }
}