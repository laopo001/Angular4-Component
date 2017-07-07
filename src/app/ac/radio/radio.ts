
import { Component, OnInit, Input, ContentChildren, QueryList, HostBinding, TemplateRef } from '@angular/core';
import { toBoolean } from '../util/util'
var classnames = require('classnames');

@Component({
    selector: 'acRadio',
    template: `
        <label class="ant-radio-wrapper" (click)="handClick($event)">
            <span [ngClass]="radioClass">
                <!--<input type="radio" class="ant-radio-input" value="on"> -->
                    <span class="ant-radio-inner">
                    </span>
                </span>
            <span [nglInternalOutlet]="label">

            </span>
        </label>
    `,
    styles: [`
  
  `]
})
export class RadioComponent implements OnInit {
    @Input() checked = false;
    @Input() label = '';
    @Input() disabled = false;
    @Input() value: any;

    handClick($event) {
        this.checked = true;
    }
    get radioClass() {
        return {
            [`ant-radio`]: true,
            [`ant-radio-checked`]: this.checked,
            [`ant-radio-disabled`]: this.disabled
        }
    }
    ngOnInit() {

    }
    Init() {
        this.checked = toBoolean(this.checked);
        this.disabled = toBoolean(this.disabled);
        if(this.value==null){
            this.value=this.label;
        }
    }
    ngOnChanges(changes: any) {
        this.Init();
    }
}
