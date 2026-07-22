import { ApplicationConfig, inject, provideAppInitializer, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import {provideTranslateService, TranslateService} from '@ngx-translate/core';
import {provideTranslateHttpLoader} from '@ngx-translate/http-loader';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export const appConfig: ApplicationConfig = {
	providers: [
		provideBrowserGlobalErrorListeners(),
		provideRouter(routes),
		provideClientHydration(),
		provideHttpClient(),
		provideTranslateService({
		loader: provideTranslateHttpLoader({
			resources: [
				'./assets/i18n/',
				'./assets/i18n/validation.'
			]
		}),
			fallbackLang: 'en',
			lang: 'en'
		}),
		provideAppInitializer(() => {
			const translate = inject(TranslateService);
			return firstValueFrom(translate.use('en'));
		})
	]
};
