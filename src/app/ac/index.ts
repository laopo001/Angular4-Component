import { NgModule, ModuleWithProviders } from '@angular/core';
import {CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';

//Module
import { Icon } from './icon/';
import { Button, ButtonGroup } from './button/';
import { Pagination } from './pagination/';
import { Select } from './select/';
import { Trigger } from './trigger/';
import { CheckBox } from './checkbox/'
import {Message} from './message/'

import {message} from './message/'


let output=[Icon,Message,Button,ButtonGroup,Pagination,Select,Trigger,CheckBox]

@NgModule({
  declarations: output,
  exports: output,
  imports: [CommonModule,FormsModule],
})
export default class acModule {

}
 export {message}