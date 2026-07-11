import { CommonModule } from "@angular/common";
import { Component, inject, OnInit, signal } from "@angular/core";
import { NavigationService } from "../../../utils/services/navigation.service";
import { NavigationEnd, Route, Router } from "@angular/router";
import { BaseRoute } from "../../../utils/routes/base.route.enum";
import { filter, map } from "rxjs";

@Component({
    selector: 'app-navbar',
    imports: [CommonModule],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

    protected readonly navigation = inject(NavigationService);
    protected readonly router = inject(Router);

    protected readonly routes = signal<Route[]>([]);
    protected readonly BaseRouteEnum = BaseRoute;
    protected readonly logo = new Image().src = 'favicon.ico';
    protected currentRoute = signal('');

    ngOnInit() {
        this.routes.set(this.navigation.getNavigationRoutes());
        this.router.events.pipe(
            filter(e => e instanceof NavigationEnd),
            map(data => {
                console.log("navbar comp, map router event: ", data.url);
                this.currentRoute.set(data.url);
            })
        )
    }
}