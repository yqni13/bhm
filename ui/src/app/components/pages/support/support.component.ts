import { CommonModule } from "@angular/common";
import { Component, inject, signal } from "@angular/core";
import { TranslatePipe } from "@ngx-translate/core";
import { TextInputComponent } from "../../common/form/text-input/text.input.component";
import { TextareaInputComponent } from "../../common/form/textarea-input/textarea.input.component";
import { SelectInputComponent } from "../../common/form/select-input/select.input.component";
import { VarDirective } from "../../../utils/directives/ng-var.directive";
import { SupportApiService } from "../../../api/services/support.api.service";
import { SupportFormData, SupportInitEditParams } from "../../../utils/interfaces/form.support.interface";
import { FieldTree, form, required } from "@angular/forms/signals";
import { SupportOption } from "../../../utils/enums/ticket-option.support.enum";

@Component({
    selector: 'app-support',
    imports: [
        CommonModule,
        TranslatePipe,
        TextInputComponent,
        TextareaInputComponent,
        SelectInputComponent,
        VarDirective
    ],
    templateUrl: './support.component.html',
    styleUrl: './support.component.scss'
})
export class SupportComponent {

    private readonly supportApi = inject(SupportApiService);

    private supportModel = signal<SupportFormData>(this.initEmptyForm());

    private initEmptyForm(params?: SupportInitEditParams): SupportFormData {
        return {
            attachment: undefined,
            userEmail: '',
            option: params?.option ?? '' as SupportOption,
            title: '',
            message: '',
            device: undefined,
            os: '',
            browser: '',
            rating: undefined,
            termFeedback: undefined
        }
    }

    private setForm(): FieldTree<SupportFormData> {
        return form(this.supportModel, (schemaPath) => {
            required(schemaPath.option);
        })
    }
}