/* eslint-disable @typescript-eslint/no-explicit-any */
import { LoginComponent } from './login.component';
import { TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform } from '@angular/core';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { NotifyModalService } from '../../../services/notify-modal.service';
import { CommonModule } from '@angular/common';
import { TextInputComponent } from '../../common/form/text-input/text.input.component';
import { BaseRoute } from '../../../utils/routes/base.route.enum';

// Avoid loading full i18n dependency in unit-test.
@Pipe({ name: 'translate', standalone: true })
class TranslatePipeStub implements PipeTransform {
    transform(value: string): string {
        return value;
    }
}

describe('LoginComponent', () => {
    let routerNavigateSpy: ReturnType<typeof vi.fn>;
    let authSetStatusSpy: ReturnType<typeof vi.fn>;
    let notifySpy: ReturnType<typeof vi.fn>;

    beforeEach(async () => {
        routerNavigateSpy = vi.fn();
        authSetStatusSpy = vi.fn();
        notifySpy = vi.fn();

        await TestBed.configureTestingModule({
            imports: [LoginComponent],
            providers: [
                { provide: Router, useValue: { navigate: routerNavigateSpy }},
                { provide: AuthService, useValue: { setStatus: authSetStatusSpy }},
                { provide: NotifyModalService, useValue: { notify: notifySpy }}
            ]
        })
        .overrideComponent(LoginComponent, {
            set: { imports: [ CommonModule, TextInputComponent, TranslatePipeStub ]}
        })
        .compileComponents();
    });

    test('Successful login', async () => {
        const fixture = TestBed.createComponent(LoginComponent);
        const component = fixture.componentInstance;
        fixture.detectChanges();

        (component as any).loginModel.set({ email: 'email', password: 'password' });
        fixture.detectChanges();

        await component.onSubmit();

        expect(authSetStatusSpy).toHaveBeenCalledWith(true);
        expect(routerNavigateSpy).toHaveBeenCalledWith(['/'+BaseRoute.HOME]);
        expect(notifySpy).not.toHaveBeenCalled();
    })
})