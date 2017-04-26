import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule }  from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { Icon } from './components/icon/';
import { Button,ButtonGroup } from './components/button/';
import { Pagination } from './components/pagination/';
import { Select } from './components/select/';
import { Trigger } from './components/trigger/';
@NgModule({
  imports: [
    BrowserModule,FormsModule
  ],
  declarations: [
    AppComponent,Icon,Button,ButtonGroup,Pagination,Select,Trigger
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
