import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InitComponent } from './components/pages/init/init.component';

@Component({
	selector: 'app-root',
	imports: [
		InitComponent,
		RouterOutlet
	],
	templateUrl: './app.html',
	styleUrl: './app.scss'
})
export class App {

	protected readonly title = signal('Better Home Management');

}
