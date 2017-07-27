import {Directive, TemplateRef} from '@angular/core';

@Directive({selector: 'template[columnHead]'})
export class columnHead {
  constructor(public templateRef: TemplateRef<any>) {}
}