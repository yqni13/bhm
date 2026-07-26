import { Component } from "@angular/core";
import { NavbarComponent } from "../../common/navbar/navbar.component";
import { RouterOutlet } from "@angular/router";
import { FooterComponent } from "../../common/footer/footer.component";

@Component({
    selector: 'app-main-layout',
    imports: [
        RouterOutlet,
        FooterComponent,
        NavbarComponent
    ],
    template: `
    @defer {
        <app-navbar></app-navbar>
        <main>
            <router-outlet />
        </main>
        <app-footer></app-footer>
    }
    `
})
export class MainLayoutComponent {}