import { Directive, inject, Input, TemplateRef, ViewContainerRef } from "@angular/core";

@Directive({
    selector: '[bhm]'
})
export class VarDirective {
    private readonly templateRef = inject(TemplateRef<unknown>);
    private readonly vcRef = inject(ViewContainerRef);

    @Input()
    set bhm(context: unknown) {
        this.context.$implicit = this.context.bhm = context;

        if (!this.hasView) {
            this.vcRef.createEmbeddedView(this.templateRef, this.context);
            this.hasView = true;
        }
    }

    private context: {
        $implicit: unknown;
        bhm: unknown;
    } = {
        $implicit: null,
        bhm: null,
    };

    private hasView = false;
}