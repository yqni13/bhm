import { Component, inject, OnInit } from "@angular/core";
import { NavigationService } from "../../../services/navigation.service";
import { TranslatePipe } from "@ngx-translate/core";

@Component({
    selector: 'app-home',
    imports: [
        TranslatePipe
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
    private readonly navigation = inject(NavigationService);

    protected title = 'Better Home Management';

    // TODO(yqni13): remove when demo no longer used
    ngOnInit() {
        console.log("Navbar routes: ", this.navigation.getNavigationRoutes());
        console.log("Footer routes: ", this.navigation.getFooterRoutes());
    }
}