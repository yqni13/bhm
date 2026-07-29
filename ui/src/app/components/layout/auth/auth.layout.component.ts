import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { FooterComponent } from "../../common/footer/footer.component";

@Component({
    selector: 'app-auth-layout',
    imports: [
        RouterOutlet,
        FooterComponent
    ],
    template: `
    <main>
        <router-outlet/>
    </main>
    <app-footer></app-footer>
    `,
    styleUrl: './auth.layout.component.scss'
})
export class AuthLayoutComponent {}