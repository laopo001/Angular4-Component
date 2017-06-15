import {Directive, TemplateRef} from '@angular/core';

@Directive({selector: 'template[columnCell]'})
export class NglDatatableCell {
  constructor(public templateRef: TemplateRef<any>) {}
}