import { Component, input } from "@angular/core";

@Component({
    selector: 'app-init',
    imports: [],
    templateUrl: './init.component.html',
    styleUrl: './init.component.scss'
})
export class InitComponent {

    title = input.required<string>();
}