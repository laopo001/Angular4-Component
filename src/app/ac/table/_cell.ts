import {Component, ChangeDetectionStrategy, Input, HostBinding, OnChanges} from '@angular/core';
import {acTableColumn} from './column';

@Component({
  selector: 'td[table-cell]',
  templateUrl: './_cell.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class _Cell implements OnChanges {
  @Input() row: any;
  @Input() column: acTableColumn;
  @Input() index: number;

  @HostBinding('attr.data-label')
  get dataLabel() {
    return this.column.heading;
  }

  context: any;

  ngOnChanges(changes?: any) {
    this.context =  {
      $implicit: this.value,
      row: this.row,
      index: this.index,
    };
  }

  get value() {
    const { key } = this.column;
    return key ? this.row[ key ] : null;
  }
}