import { Directive, TemplateRef, Input,Output,EventEmitter } from '@angular/core';

@Directive({ selector: 'template[acLoading]' })
export class LoadingOverlay {
  constructor(public templateRef: TemplateRef<any>) { }
}

@Directive({ selector: 'template[acNoData]' })
export class NoData {
  constructor(public templateRef: TemplateRef<any>) { }
}


@Directive({ selector: 'template[acExpandedRow]' })
export class ExpandedRow {
  @Input() className: string = '';
  constructor(public templateRef: TemplateRef<any>) { }
}