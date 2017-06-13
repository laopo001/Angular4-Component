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
// import {Table} from './table/'

import {NglDatatablesModule} from './table/module';


enableProdMode();

let output=[Icon,message,Button,ButtonGroup,Pagination,Select,Popover,CheckBox,Trigger,Option,acTrigger,NglPopover]

@NgModule({
  declarations: output,
  exports: output,
  entryComponents: [ NglPopover ],
  imports: [CommonModule,FormsModule,BrowserAnimationsModule],
})
export default class acModule {

}
export {message}

export {NglDatatablesModule}