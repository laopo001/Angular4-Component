import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NglInternalOutletModule} from '../util/outlet.module';

import {datatable as NglDatatable} from './datatable';
import {NglDatatableColumn} from './column';
import {NglDatatableCell} from './cell';
import {NglDatatableHeadingTemplate} from './heading';
import {NglDatatableLoadingOverlay, NglDatatableNoRowsOverlay} from './overlays';


import {NglInternalDatatableHeadCell} from './_head';
import {NglInternalDatatableCell} from './_cell';


export {INglDatatableSort, INglDatatableRowClick} from './datatable';

const NGL_DATATABLE_DIRECTIVES = [
  NglDatatable,
  NglDatatableColumn,
  NglDatatableCell,
  NglDatatableHeadingTemplate,
  NglDatatableLoadingOverlay, NglDatatableNoRowsOverlay,

];

@NgModule({
  declarations: [...NGL_DATATABLE_DIRECTIVES, NglInternalDatatableHeadCell, NglInternalDatatableCell],
  exports: [NGL_DATATABLE_DIRECTIVES],
  imports: [CommonModule, NglInternalOutletModule],
})
export class NglDatatablesModule {}