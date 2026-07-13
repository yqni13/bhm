import { Component } from "@angular/core";
import { NavbarComponent } from "../../common/navbar/navbar.component";
import { RouterOutlet } from "@angular/router";

@Component({
    selector: 'app-main-layout',
    imports: [
        RouterOutlet,
        NavbarComponent
    ],
    template: `
    @defer {
        <app-navbar></app-navbar>
        <main>
            <router-outlet />
        </main>
    }
    `
})
export class MainLayoutComponent {}