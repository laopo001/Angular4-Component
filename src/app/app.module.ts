import { NgModule,enableProdMode } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule }  from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {
    Routes,
    RouterModule
} from '@angular/router';


import Page1Component from './pages/page1/page1.component'
import Page2Component from './pages/page2/page2.component'
import Page3Component from './pages/page3/page3.component'
import {
    AppComponent
} from './app.component';
import {message} from './ac/message/'

import acModule from './ac/'

export const ROUTES: Routes = [{
    path: 'page1',
    component: Page1Component
},{
    path: 'page2',
    component: Page2Component
},{
    path: 'page3',
    component: Page3Component
},{
    path: '**',
    redirectTo: '/page1',
    pathMatch: 'full'
}];



let R=RouterModule.forRoot(ROUTES, {
    useHash: true
})
@NgModule({
  imports: [
    BrowserModule,FormsModule,acModule,R,BrowserAnimationsModule
  ],
  declarations: [
    AppComponent,Page1Component,Page2Component,Page3Component,message
  ],
  
  bootstrap: [ AppComponent ]
})
export class AppModule { }
