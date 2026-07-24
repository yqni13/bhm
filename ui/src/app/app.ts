import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotifyModalComponent } from './components/common/modal/notify/notify.modal.component';
import { NotifyModalService } from './services/notify-modal.service';

@Component({
	selector: 'app-root',
	imports: [
		RouterOutlet,
		NotifyModalComponent
	],
	templateUrl: './app.html',
	styleUrl: './app.scss'
})
export class App {
	private readonly translate = inject(TranslateService);
	protected readonly notifyModal = inject(NotifyModalService);

	protected readonly title = signal('Better Home Management');

	constructor() {
		this.translate.addLangs(['de', 'en'])
	}

}
