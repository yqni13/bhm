import { CommonModule } from "@angular/common";
import { AfterViewInit, Component, computed, effect, ElementRef, input, signal, viewChild } from "@angular/core";
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
export class TextInputComponent extends AbstractInputComponent implements AfterViewInit {

    private readonly isAutoFocus = viewChild<ElementRef>('isAutoFocus');

    readonly inputType = input('text');
    readonly autoFocus = input(false);
    readonly inputTypeComputed = computed(() => this.showPassword() ? 'text' : 'password');
    readonly eyeStyleComputed = computed(() => this.setEyeStyle());
    readonly indentStyleComputed = computed(() => this.setIndentStyle());

    protected readonly showPassword = signal(false);

    constructor() {
        super();
        effect(() => {
            this.handleInputChanges(this.field().value());
        });
    }

    ngAfterViewInit() {
        if(this.autoFocus()) {
            this.isAutoFocus()?.nativeElement.focus();
        }
    }

    setEyeStyle(): Record<string, string> {
        if(this.field().invalid() && (this.field().dirty() || this.field().touched())) {
            return { 'margin-right': '40px' };
        }
        return { 'margin-right': '10px' };
    }

    setIndentStyle(): Record<string, string> {
        // Dynamic indent styling necessary due to additional icon for input type 'password'.
        const error = (this.field().invalid() && (this.field().dirty() || this.field().touched()));
        let [width, padRight] = [0, 0];
        if(this.inputType() === 'password') {
            padRight = error ? this.iPadError + this.indent.iEye : this.indent.iEye * 2;
            width = error 
                ? this.indent.iPadStart + this.iPadError + this.indent.iEye + (this.indent.border * 2) 
                : this.indent.iPadStart + this.indent.iEye + (this.indent.border * 2);
        } else if(this.inputType() === 'text') {
            padRight = error ? this.iPadError - this.indent.iPadStart : this.indent.iPadStart;
            width = error 
                ? this.indent.iPadStart + this.iPadError + (this.indent.border * 2) 
                : this.indent.iPadStart + (this.indent.border * 2);
        }
        return {
            'width': `calc(100% - ${width})`,
            'padding-right': `${padRight}px`
        };
    }

    handleInputChanges(value: string) {
        this.byChange.emit(value);
        this.isFocused = true;
    }

    setPasswordVisibility(visible: boolean) {
        this.showPassword.set(visible);
    }
}