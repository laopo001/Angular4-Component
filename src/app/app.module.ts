import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule }  from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { Icon } from './components/icon/';
import { Button,ButtonGroup } from './components/button/';
import { Pagination } from './components/pagination/';
import { Select } from './components/select/';
import { Trigger } from './components/trigger/';
import { CheckBox } from './components/checkbox/'
import message from './components/message/'
@NgModule({
  imports: [
    BrowserModule,FormsModule,BrowserAnimationsModule
  ],
  declarations: [
    AppComponent,Icon,Button,ButtonGroup,Pagination,Select,Trigger,CheckBox,message
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
