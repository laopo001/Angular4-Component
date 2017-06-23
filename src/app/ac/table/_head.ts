import {Component, ChangeDetectionStrategy, Input, Output, EventEmitter, HostBinding, TemplateRef} from '@angular/core';

@Component({
  selector: 'th[datatatable-head]',
  templateUrl: './_head.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NglInternalDatatableHeadCell {

  // @HostBinding('attr.title')
  @Input() heading: string;
  @Input() headingTpl: TemplateRef<any>;

  get header() {
    return this.headingTpl || this.heading;
  }

  // @HostBinding('class.slds-is-sortable')
  @Input() sortable: boolean;

  @Input() sortOrder: 'asc' | 'desc';

  // @HostBinding('attr.aria-sort')

  get ariaSortUp() {

    return this.sortOrder=='asc' ? 'on' : 'off';
  }
  get ariaSortDown() {

    return this.sortOrder=='desc' ? 'on' : 'off';
  }
  @Output() onSort = new EventEmitter();

  sortChange(type:any) {
    this.onSort.emit(type);
  }
}