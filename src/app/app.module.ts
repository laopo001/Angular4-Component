import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule }  from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
// import {acTrigger,NglPopover,NglPopoverBehavior} from './ac/acTrigger/'
import { AppComponent } from './app.component';

import acModule from './ac/'
@NgModule({
  imports: [
    BrowserModule,FormsModule,BrowserAnimationsModule,acModule
  ],
  declarations: [
    AppComponent
  ],
  
  bootstrap: [ AppComponent ]
})
export class AppModule { }
