import { Directive, Input, ContentChild } from '@angular/core';
import { columnCell } from './cell';
import { columnHead } from './heading';
import { toBoolean } from '../util/util';

@Directive({
  selector: 'acTable-column',
})
export class acTableColumn {
  @Input() heading: string;
  @Input() key: string;
  @Input() headClass: any;
  @Input() cellClass: any;
  @Input() width: number | string;
  @Input() fixLeft: boolean | string;
  @Input() fixRight: boolean | string;
  @ContentChild(columnCell) cellTpl: columnCell;
  @ContentChild(columnHead) headingTpl: columnHead;

  @Input() set sortable(sortable: string | boolean) {
    this._sortable = toBoolean(sortable);
  }
  get sortable() {
    return this._sortable;
  }

  private _sortable = false;
};