import {Directive, TemplateRef} from '@angular/core';

@Directive({selector: 'template[columnCell]'})
export class columnCell {
  constructor(public templateRef: TemplateRef<any>) {}
}