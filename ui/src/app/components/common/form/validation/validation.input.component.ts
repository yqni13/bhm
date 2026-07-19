import { CommonModule } from "@angular/common";
import { Component, input } from "@angular/core";
import { Field, FieldState } from "@angular/forms/signals";
import { FormValidation } from "../../../../utils/interfaces/form-validation.interface";
import { default as validationList } from "../../../../data/form-validation.data.json";

@Component({
    selector: 'app-validation-input',
    imports: [
        CommonModule
    ],
    templateUrl: './validation.input.component.html',
    styleUrl: './validation.input.component.scss'
})
export class ValidationInputComponent {

    readonly fieldState = input.required<FieldState<string | number>>();
    readonly fieldName = input('');

    protected validations: FormValidation[] = validationList;

    get field(): Field<string> {
        return this.fieldState().fieldTree as unknown as Field<string>;
    }

    mapErrorValues(msg: string, ids: string[]): string {
        let i = 0;
        ids.forEach(id => {
            msg = msg.replace(`{{VAL_${i}}}`, this.getErrorMappingValue(id));
            i++;
        })
        return msg;
    }

    getErrorMappingValue(id: string): string {
        switch(id) {
            case('fieldName'): 
                return this.fieldName();
            case('fieldMax'): {
                return this.fieldState().errors()[0].message!
            }
            default: 
                return String(this.fieldState().value());
        }
    }
}