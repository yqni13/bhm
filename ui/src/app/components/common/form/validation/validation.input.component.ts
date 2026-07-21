import { CommonModule } from "@angular/common";
import { Component, input } from "@angular/core";
import { Field, FieldState } from "@angular/forms/signals";
import { FormValidation } from "../../../../utils/interfaces/form-validation.interface";
import { default as validationList } from "../../../../data/form-validation.data.json";
import { TranslatePipe } from "@ngx-translate/core";

@Component({
    selector: 'app-validation-input',
    imports: [
        CommonModule,
        TranslatePipe
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

    mapTranslateParams(params: string[]): Record<string, string> {
        let mappedParams: Record<string, string> = {};
        params.forEach((param: string) => {
            mappedParams = {
                ...mappedParams,
                [param]: this.getErrorMappingValue(param)
            }
        })
        return mappedParams;
    }
}