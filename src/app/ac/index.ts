import { NgModule, ModuleWithProviders } from '@angular/core';
import {CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';

//Module
import { Icon } from './icon/';
import { Button, ButtonGroup } from './button/';
import { Pagination } from './pagination/';
import {Select ,Option} from './acSelect/';
import { Popover } from './popover/';
import { CheckBox } from './checkbox/'
import {Message} from './message/'
import {Trigger} from './trigger/'
import {acTrigger,NglPopover} from './acTrigger/'

import {message} from './message/'


let output=[Icon,Message,Button,ButtonGroup,Pagination,Select,Popover,CheckBox,Trigger,Option,acTrigger,NglPopover]

@NgModule({
  declarations: output,
  exports: output,
  entryComponents: [ NglPopover ],
  imports: [CommonModule,FormsModule],
})
export default class acModule {

}
 export {message}