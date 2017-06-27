import { NgModule, ModuleWithProviders,enableProdMode } from '@angular/core';
import {CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { Icon } from './icon/';
import { Button, ButtonGroup } from './button/';
import { Pagination } from './pagination/';
import {Select ,Option} from './acSelect/';
import { Popover } from './popover/';
import { CheckBox } from './checkbox/'
import {message} from './message/'

import {acTriggerClick,acTriggerHover ,acTriggerFocus} from './acTrigger/'
import {Trigger,NglPopover} from './trigger/'
import {Table,NglInternalOutletModule,NglDatatableColumn,NglDatatableCell,NglDatatableHeadingTemplate,NglDatatableLoadingOverlay,NglDatatableNoRowsOverlay,NglInternalDatatableHeadCell,NglInternalDatatableCell} from './table/'


enableProdMode();

let output=[
  Icon,message,Button,ButtonGroup,Pagination,Select,Popover,CheckBox,Option,Trigger,NglPopover,acTriggerClick,acTriggerHover,acTriggerFocus,
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
