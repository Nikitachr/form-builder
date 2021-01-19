import { Directive, Input, OnChanges, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive(
  {
    selector: '[appNgLoop]'
  })
export class NgLoopDirective implements OnChanges {
  @Input() appNgLoopOf: Array<any> | undefined;

  constructor(
    private container: ViewContainerRef,
    private template: TemplateRef<any>
  ) {}

  ngOnChanges(): void {
    this.container.clear();

    for (const input of this.appNgLoopOf as Array<any>) {
      this.container.createEmbeddedView(this.template, {
        $implicit: input,
        index: this.appNgLoopOf?.indexOf(input)
      });
    }
  }
}

