import { CommonModule } from "@angular/common";
import { Component, inject, signal } from "@angular/core";
import { TextInputComponent } from "../../common/form/text-input/text.input.component";
import { LoginFormData } from "../../../api/interfaces/login.api.interface";
import { FieldTree, form, required } from "@angular/forms/signals";
import { AuthService } from "../../../services/auth.service";
import { Router } from "@angular/router";
import { BaseRoute } from "../../../utils/routes/base.route.enum";
import * as CustomValidator from "../../../utils/helper/custom-validators";
import { TranslatePipe } from "@ngx-translate/core";
import { NotifyModalService } from "../../../services/notify-modal.service";
import { NotifyModalType } from "../../../utils/enums/notify-modal.enum";

@Component({
    selector: 'app-login',
    imports: [
        CommonModule,
        TextInputComponent,
        TranslatePipe
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
    host: {
        '(document:keydown)': 'submitOnEnterKey($event)'
    }
})
export class LoginComponent {

    private readonly router = inject(Router);
    private readonly auth = inject(AuthService);
    private readonly notifyModal = inject(NotifyModalService);

    private demoLogin = { email: 'email', password: 'password' };
    protected validation = { maxEmail: 256, maxPass: 256 };

    private loginModel = signal<LoginFormData>(this.initEmptyForm());
    protected loginForm = this.setForm();

    private initEmptyForm(): LoginFormData {
        return {
            email: '',
            password: ''
        }
    }

    private setForm(): FieldTree<LoginFormData> {
        return form(this.loginModel, (schemaPath) => {
            required(schemaPath.email);
            CustomValidator.customMaxLength(schemaPath.email, {max: this.validation.maxEmail});

            required(schemaPath.password);
            CustomValidator.customMaxLength(schemaPath.password, {max: this.validation.maxPass});
        })
    }

    async onSubmit() {
        if(this.loginForm().invalid()) {
            this.loginForm().markAsTouched();
            this.notifyModal.notify({
                title: 'components.pages.login.form.submit.invalid.title',
                text: 'components.pages.login.form.submit.invalid.text',
                type: NotifyModalType.WARNING,
                autoClose: true,
                displayTimeInMilliseconds: 2000
            })
            return;
        }
        // TODO(yqni13): testing only until BHM-2-login-service-frontend
        if(this.loginForm.email().value() === this.demoLogin.email
        && this.loginForm.password().value() === this.demoLogin.password) {
            console.log("Login successful!");
            this.auth.setStatus(true);
            this.router.navigate(['/' + BaseRoute.HOME]);
        }
    }

    async submitOnEnterKey(event: KeyboardEvent) {
        const target = event.target as HTMLElement;
        if(event.key === 'Enter' && (
            target.id === 'custom-form-email' ||
            target.id === 'custom-form-password' ||
            target.className === 'login-submit'
        )) {
            await this.onSubmit();
        }
    }
}