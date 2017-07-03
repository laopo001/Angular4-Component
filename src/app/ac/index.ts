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

import {acTrigger,acTriggerClick,acTriggerHover ,acTriggerFocus} from './acTrigger/'
import {Trigger,NglPopover} from './trigger/'
import {Table,NglInternalOutletModule,NglDatatableColumn,NglDatatableCell,NglDatatableHeadingTemplate,NglDatatableLoadingOverlay,NglDatatableNoRowsOverlay,NglInternalDatatableHeadCell,NglInternalDatatableCell} from './table/'

import SpinComponent from './spin/'

enableProdMode();

let output=[
  Icon,message,Button,ButtonGroup,Pagination,Select,Popover,CheckBox,Option,Trigger,NglPopover,acTriggerClick,acTriggerHover,acTriggerFocus,acTrigger,
  Table,
  NglDatatableColumn,
  NglDatatableCell,
  NglDatatableHeadingTemplate,
  NglDatatableLoadingOverlay, NglDatatableNoRowsOverlay,
  SpinComponent,
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
