import { Directive, Input, ContentChild } from '@angular/core';
import { NglDatatableCell } from './cell';
import { NglDatatableHeadingTemplate } from './heading';
import { toBoolean } from '../util/util';

@Directive({
  selector: 'acTable-column',
})
export class NglDatatableColumn {
  @Input() heading: string;
  @Input() key: string;
  @Input() headClass: any;
  @Input() cellClass: any;
  @Input() width: number | string;
  @Input() fixLeft: boolean | string;
  @Input() fixRight: boolean | string;
  @ContentChild(NglDatatableCell) cellTpl: NglDatatableCell;
  @ContentChild(NglDatatableHeadingTemplate) headingTpl: NglDatatableHeadingTemplate;

  @Input() set sortable(sortable: string | boolean) {
    this._sortable = toBoolean(sortable);
  }
  get sortable() {
    return this._sortable;
  }

  private _sortable = false;
};