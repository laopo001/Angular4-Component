import {Directive, TemplateRef} from '@angular/core';

@Directive({selector: 'template[acLoading]'})
export class NglDatatableLoadingOverlay {
  constructor(public templateRef: TemplateRef<any>) {}
}

@Directive({selector: 'template[acNoData]'})
export class NglDatatableNoRowsOverlay {
  constructor(public templateRef: TemplateRef<any>) {}
}