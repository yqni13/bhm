import { Component, inject, OnInit } from "@angular/core";
import { NavigationService } from "../../../utils/services/navigation.service";

@Component({
    selector: 'app-home',
    imports: [],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
    private readonly navigation = inject(NavigationService);

    protected title = 'Better Home Management';

    // TODO(yqni13): remove when demo no longer used
    ngOnInit() {
        console.log("Navbar routes: ", this.navigation.getNavigationRoutes());
        console.log("Footer routes: ", this.navigation.getFootertRoutes());
    }
}