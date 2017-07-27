import { Component, ViewChild, TemplateRef, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from './app.router'

@Component({
  selector: 'my-app',

  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
   ROUTES=ROUTES;
}
