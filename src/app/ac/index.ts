import { NgModule, ModuleWithProviders, enableProdMode } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Icon } from './icon/';
import { Button, ButtonGroup } from './button/';
import { Pagination } from './pagination/';
import { Select, Option } from './acSelect/';
import { Popover } from './popover/';
import { CheckBox, CheckBoxGroup } from './checkbox/'
import { message } from './message/'

import { acTrigger, acTriggerClick, acTriggerHover, acTriggerFocus } from './acTrigger/'
import { Trigger, NglPopover } from './trigger/'
import { Popconfirm } from './popconfirm/'

import { Table, ngOutModule, acTableColumn, Tabletr, columnCell, columnHead, expandedRowIcon, NoData, ExpandedRow, _HeadCell, _Cell } from './table/'

import { SpinComponent } from './spin/'
import { RowComponent, ColComponent, RowComponent2, ColComponent2 } from './grid/'


import { FormComponent, FormItemComponent } from './form/'
import { RadioComponent, RadioGroupComponent } from './radio';
import { acInput, acTextArea } from './input';
import { Modal } from './modal';
import { Tooltip } from './tooltip';

// enableProdMode();

let output = [
  Icon, Button, ButtonGroup, CheckBox, CheckBoxGroup,
  Select, Option,
  Trigger, NglPopover, acTriggerClick, acTriggerHover, acTriggerFocus, acTrigger,
  Popover,
  Pagination,
  Table,
  acTableColumn,
  columnCell,
  columnHead,
  NoData, ExpandedRow,
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
  declarations: [...output, _HeadCell, _Cell, RowComponent, ColComponent, expandedRowIcon],
  exports: [...output],
  entryComponents: [NglPopover],
  imports: [CommonModule, FormsModule, ngOutModule],
})
export default class acModule {

}
export { message }
