import { NgModule, ModuleWithProviders,enableProdMode } from '@angular/core';
import {CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
//Module
import { Icon } from './icon/';
import { Button, ButtonGroup } from './button/';
import { Pagination } from './pagination/';
import {Select ,Option} from './acSelect/';
import { Popover } from './popover/';
import { CheckBox } from './checkbox/'
import {message} from './message/'
import {Trigger} from './trigger/'
import {acTrigger,NglPopover} from './acTrigger/'

// import {NglDatatablesModule} from './table/module';
import {Table,NglInternalOutletModule,NglDatatableColumn,NglDatatableCell,NglDatatableHeadingTemplate,NglDatatableLoadingOverlay,NglDatatableNoRowsOverlay,NglInternalDatatableHeadCell,NglInternalDatatableCell} from './table/'


enableProdMode();

let output=[
  Icon,message,Button,ButtonGroup,Pagination,Select,Popover,CheckBox,Trigger,Option,acTrigger,NglPopover,
  Table,
  NglDatatableColumn,
  NglDatatableCell,
  NglDatatableHeadingTemplate,
  NglDatatableLoadingOverlay, NglDatatableNoRowsOverlay,
]

@NgModule({
  declarations:[...output,NglInternalDatatableHeadCell, NglInternalDatatableCell],
  exports: [...output],
  entryComponents: [ NglPopover ],
  imports: [CommonModule,FormsModule,BrowserAnimationsModule,NglInternalOutletModule],
})
export default class acModule {

}
export {message}
