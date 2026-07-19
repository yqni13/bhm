import { CommonModule } from "@angular/common";
import { Component, effect, input } from "@angular/core";
import { FormField } from "@angular/forms/signals";
import { ValidationInputComponent } from "../validation/validation.input.component";
import { AbstractInputComponent } from "../abstract.input.component";

@Component({
    selector: 'app-select-input',
    imports: [
        CommonModule,
        FormField,
        ValidationInputComponent
    ],
    templateUrl: './select.input.component.html',
    styleUrls: [
        '../abstract.input.component.scss',
        './select.input.component.scss'
    ],
    host: {
        '(click)': 'clickOutside($event)',
        '(document:keydown)': 'tabOutside($event)'
    }
})
export class SelectInputComponent extends AbstractInputComponent {

    readonly readonlyStyle = input<Record<string, string>>({});
    readonly options = input<unknown>({});

    protected isSelected = false;

    constructor() {
        super();
        effect(() => {
            this.handleSelectionChanges(this.field().value());
        });
    }

    handleSelectionChanges(value: string) {
        if(!value || value === '') {
            this.isSelected = false;
        }
    }

    selectOption(event: Event) {
        this.byChange.emit(event);
        this.isFocused = false;
        this.isSelected = true;
    }
}