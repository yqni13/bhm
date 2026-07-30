import { CommonModule } from "@angular/common";
import { Component, computed, effect, input, output, signal } from "@angular/core";
import { TranslatePipe } from "@ngx-translate/core";

@Component({
    selector: 'app-star-rating',
    imports: [
        CommonModule,
        TranslatePipe
    ],
    templateUrl: './star-rating.component.html',
    styleUrl: './star-rating.component.scss'
})
export class StarRatingComponent {

    startValue = input(0);
    resetValue = input<number>();

    readonly byChange = output<number>();

    protected hasNewRating = signal(false);
    protected rawRating = signal(0);

    protected checkedValue = computed(() => this.handleRating());

    constructor() {
        effect(() => {
            const reset = this.resetValue();
            this.rawRating.set(reset !== undefined ? reset : this.startValue());
        })
    }

    private handleRating(): number {
        const reset = this.resetValue();
        const base = reset !== undefined ? reset : this.startValue();
        return this.convertFloat2Int(base);
    }

    private convertFloat2Int(raw: number): number {
        return (raw - Math.floor(raw)) >= 0.5 ? Math.ceil(raw) : Math.floor(raw);
    }

    onChange(event: Event) {
        const value = Number((event.currentTarget as HTMLInputElement).value);
        this.rawRating.set(value);
        this.hasNewRating.set(true);
        this.byChange.emit(value);
    }
}