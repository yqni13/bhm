import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/common/navbar/navbar.component';
import { AuthService } from './utils/services/auth.service';

@Component({
	selector: 'app-root',
	imports: [
		RouterOutlet,
		NavbarComponent
	],
	templateUrl: './app.html',
	styleUrl: './app.scss'
})
export class App {

	protected readonly auth = inject(AuthService);

	protected readonly title = signal('Better Home Management');

}
