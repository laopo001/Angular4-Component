import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ngOutModule } from '../util/outlet.module';

import { datatable as NglDatatable } from './datatable';
import { acTableColumn } from './column';
import { columnCell } from './cell';
import { columnHead } from './heading';
import { LoadingOverlay, NoData, ExpandedRow } from './overlays';


import { _HeadCell } from './_head';
import { _Cell } from './_cell';


export { INglDatatableSort, INglDatatableRowClick } from './datatable';

const NGL_DATATABLE_DIRECTIVES = [
  NglDatatable,
  acTableColumn,
  columnCell,
  columnHead,
  LoadingOverlay, NoData,ExpandedRow

];

@NgModule({
  declarations: [...NGL_DATATABLE_DIRECTIVES, _HeadCell, _Cell],
  exports: [NGL_DATATABLE_DIRECTIVES],
  imports: [CommonModule, ngOutModule],
})
export class NglDatatablesModule { }