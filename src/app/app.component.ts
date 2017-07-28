import { Component, ViewChild, TemplateRef, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from './app.router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {

   ROUTES=ROUTES;
}
