import {Directive, TemplateRef} from '@angular/core';

@Directive({selector: 'template[columnHead]'})
export class NglDatatableHeadingTemplate {
  constructor(public templateRef: TemplateRef<any>) {}
}