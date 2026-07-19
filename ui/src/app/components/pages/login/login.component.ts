import { CommonModule } from "@angular/common";
import { Component, inject, signal } from "@angular/core";
import { TextInputComponent } from "../../common/form/text-input/text.input.component";
import { LoginFormData } from "../../../api/interfaces/login.api.interface";
import { FieldTree, form, required } from "@angular/forms/signals";
import { AuthService } from "../../../services/auth.service";
import { Router } from "@angular/router";
import { BaseRoute } from "../../../utils/routes/base.route.enum";
import * as CustomValidator from "../../../utils/helper/custom-validators";

@Component({
    selector: 'app-login',
    imports: [
        CommonModule,
        TextInputComponent
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

    private demoLogin = { email: 'email', password: 'password' };
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
            required(schemaPath.password);
            CustomValidator.customMaxLength(schemaPath.password, {max: 20});
        })
    }

    async onSubmit() {
        if(this.loginForm().invalid()) {
            this.loginForm().markAsTouched();
            // notification
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