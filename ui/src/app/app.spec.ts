import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { App } from './app';
import { NotifyModalService } from './services/notify-modal.service';
import { RouterOutlet } from '@angular/router';
import { NotifyModalComponent } from './components/common/modal/notify/notify.modal.component';
import { TranslateService } from '@ngx-translate/core';

describe('App', () => {
	let addLangSpy: ReturnType<typeof vi.fn>;
	let notifySpy: ReturnType<typeof vi.fn>;
	beforeEach(async () => {
		addLangSpy = vi.fn();
		notifySpy = vi.fn();

		await TestBed.configureTestingModule({
			imports: [App],
			providers: [
				{ provide: TranslateService, useValue: { addLangs: addLangSpy }},
				{ provide: NotifyModalService, useValue: { notify: notifySpy }}
			]
		})
		.overrideComponent(App, {
			set: { imports: [ RouterOutlet, NotifyModalComponent ]}
		})
		.compileComponents();
	});

	it('should create the app', () => {
		const fixture = TestBed.createComponent(App);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
		expect(addLangSpy).toHaveBeenCalledWith(['de', 'en']);
	});
});
