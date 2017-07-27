import { NgModule, enableProdMode } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Routes, RouterModule } from '@angular/router';


import Page1Component from './pages/page1/page1.component'
import Page2Component from './pages/page2/page2.component'
import Page3Component from './pages/page3/page3.component'
import { TableDemoComponent } from './pages/table/demo.component'
import { CheckboxDemoComponent } from './pages/checkbox/demo.component'
import { InputDemoComponent } from './pages/input/demo.component'
import { SelectDemoComponent } from './pages/select/demo.component'
import { AppComponent } from './app.component';
import { message } from './ac/message/'

import acModule from './ac/'

import { ROUTES } from './app.router'


@NgModule({
    imports: [
        BrowserModule, FormsModule, acModule, RouterModule.forRoot(ROUTES, {
            useHash: true
        }), BrowserAnimationsModule
    ],
    declarations: [
        AppComponent, Page1Component, Page2Component, Page3Component, message, TableDemoComponent, CheckboxDemoComponent, InputDemoComponent,SelectDemoComponent
    ],

    bootstrap: [AppComponent]
})
export class AppModule { }
