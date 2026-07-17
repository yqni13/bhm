import { CommonModule } from "@angular/common";
import { Component, effect, input } from "@angular/core";
import { FormField } from "@angular/forms/signals";
import { ValidationInputComponent } from "../validation/validation.input.component";
import { AbstractInputComponent } from "../abstract.input.component";

@Component({
    selector: 'app-textarea-input',
    imports: [
        CommonModule,
        FormField,
        ValidationInputComponent
    ],
    templateUrl: './textarea.input.component.html',
    styleUrls: [
        '../abstract.input.component.scss',
        './textarea.input.component.scss'
    ],
    host: {
        '(click)': 'clickOutside($event)',
        '(document:keydown)': 'tabOutside($event)'
    }
})
export class TextareaInputComponent extends AbstractInputComponent {

    readonly rows = input(0);

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