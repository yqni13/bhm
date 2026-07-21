import { Directive, inject, Input, TemplateRef, ViewContainerRef } from "@angular/core";

@Directive({
    selector: '[bhmVar]'
})
export class VarDirective {
    private readonly templateRef = inject(TemplateRef<unknown>);
    private readonly vcRef = inject(ViewContainerRef);

    @Input()
    set bhmVar(context: unknown) {
        this.context.$implicit = this.context.bhmVar = context;

        if (!this.hasView) {
            this.vcRef.createEmbeddedView(this.templateRef, this.context);
            this.hasView = true;
        }
    }

    private context: {
        $implicit: unknown;
        bhmVar: unknown;
    } = {
        $implicit: null,
        bhmVar: null,
    };

    private hasView = false;
}