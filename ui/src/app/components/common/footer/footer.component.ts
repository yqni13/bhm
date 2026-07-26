import { Component, inject, OnInit, signal } from "@angular/core";
import { NavigationService } from "../../../services/navigation.service";
import { Route } from "@angular/router";
import { CommonModule } from "@angular/common";
import { default as metaData } from "../../../../../package.json";
import { TranslatePipe } from "@ngx-translate/core";

@Component({
    selector: 'app-footer',
    imports: [
        CommonModule,
        TranslatePipe
    ],
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit {

    protected readonly navigation = inject(NavigationService);

    protected readonly routes = signal<Route[]>([]);
    protected year = new Date().getFullYear().toString();
    protected version = metaData.version;
    protected app = 'BHM';

    ngOnInit() {
        this.routes.set(this.navigation.getFooterRoutes());
    }
}