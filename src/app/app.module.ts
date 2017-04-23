import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { Icon } from './components/icon/';
import { Button,ButtonGroup } from './components/button/';
import { Pagination } from './components/pagination/';
@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    AppComponent,Icon,Button,ButtonGroup,Pagination
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
