
import { Component, OnInit, Input, ContentChildren, QueryList, HostBinding, TemplateRef } from '@angular/core';
import { toBoolean } from '../util/util'
var classnames = require('classnames');

@Component({
    selector: 'Form',
    template: `
        <ng-content></ng-content>

    `,
    styles: [`
  
  `]
})
export  class FormComponent implements OnInit {
    @HostBinding('class')
    get HostClass() {
        return classnames({
            [`ant-form `]: true,
            [`ant-form-${this.layout}`]: !!this.layout
        });
    }
    @Input() layout: 'horizontal' | 'vertical' | 'inline' = "horizontal"

    Init() {

    }


    ngOnInit() {

    }
    ngOnChanges(changes: any) {
        this.Init();
    }
}
