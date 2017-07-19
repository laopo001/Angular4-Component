import { NgModule, ModuleWithProviders, enableProdMode } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Icon } from './icon/';
import { Button, ButtonGroup } from './button/';
import { Pagination } from './pagination/';
import { Select, Option } from './acSelect/';
import { Popover } from './popover/';
import { CheckBox,CheckBoxGroup } from './checkbox/'
import { message } from './message/'

import { acTrigger, acTriggerClick, acTriggerHover, acTriggerFocus } from './acTrigger/'
import { Trigger, NglPopover } from './trigger/'
import { Popconfirm } from './popconfirm/'

import { Table, NglInternalOutletModule, NglDatatableColumn, NglDatatableCell, NglDatatableHeadingTemplate, NglDatatableNoRowsOverlay, NglInternalDatatableHeadCell, NglInternalDatatableCell } from './table/'

import { SpinComponent } from './spin/'
import { RowComponent, ColComponent, RowComponent2, ColComponent2 } from './grid/'


import { FormComponent, FormItemComponent } from './form/'
import { RadioComponent, RadioGroupComponent } from './radio';
import { acInput, acTextArea } from './input';
import { Modal } from './modal';
import { Tooltip } from './tooltip';

enableProdMode();

let output = [
  Icon, Button, ButtonGroup, CheckBox,CheckBoxGroup,
  Select, Option,
  Trigger, NglPopover, acTriggerClick, acTriggerHover, acTriggerFocus, acTrigger,
  Popover,
  Pagination,
  Table,
  NglDatatableColumn,
  NglDatatableCell,
  NglDatatableHeadingTemplate,
  NglDatatableNoRowsOverlay,
  SpinComponent,
  RowComponent2, ColComponent2,
  FormComponent, FormItemComponent,
  RadioComponent, RadioGroupComponent,
  Popconfirm,
  acInput, acTextArea,
  Modal,
  Tooltip
  // RowComponent, ColComponent
]

@NgModule({
  declarations: [...output, NglInternalDatatableHeadCell, NglInternalDatatableCell, RowComponent, ColComponent],
  exports: [...output],
  entryComponents: [NglPopover],
  imports: [CommonModule, FormsModule, NglInternalOutletModule],
})
export default class acModule {

}
export { message }
