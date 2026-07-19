import { CommonModule } from "@angular/common";
import { Component, inject, OnInit, signal } from "@angular/core";
import { NavigationService } from "../../../services/navigation.service";
import { Route } from "@angular/router";
import { BaseRoute } from "../../../utils/routes/base.route.enum";

@Component({
    selector: 'app-navbar',
    imports: [
        CommonModule
    ],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

    protected readonly navigation = inject(NavigationService);

    protected readonly routes = signal<Route[]>([]);
    protected readonly BaseRouteEnum = BaseRoute;
    protected readonly logo = new Image().src = 'favicon.ico';

    ngOnInit() {
        this.routes.set(this.navigation.getNavigationRoutes());
    }
}