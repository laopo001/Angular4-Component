import { Component, Input, OnInit, Output, EventEmitter, QueryList, ContentChildren } from '@angular/core';

import { CheckBox } from './checkbox'
@Component({
    selector: 'CheckGroup',
    template: `<div  [ngClass]="Tclass" [ngStyle]="style">
       <ng-content></ng-content>
    </div>`,
})
// @classDecorator
export class CheckBoxGroup implements OnInit {
    @ContentChildren(CheckBox) CheckBoxs: QueryList<CheckBox>;
    @Input() style: any = {};

    get Tclass(){
        return {
            [`ant-checkbox-group`]:true,
            [`${this.className}`]:!!this.className
        }
    }

    @Input() className: string;

    @Input() value: any[];
    @Input() options: string[];
    @Output() onChange = new EventEmitter();
    @Output() valueChange = new EventEmitter();
    ngOnInit() {

    }

    childClick(x) {
        if (x.checked) {
            x.checked = false
            let index = this.value.indexOf(x.value);
            this.value.splice(index, 1)
        } else {
            x.checked = true;
            this.value.push(x.value)

        }
        this.onChange.emit(this.value);
        this.valueChange.emit(this.value);
    }

    Init() {
        if (this.CheckBoxs == null) return;
        this.CheckBoxs.forEach((x: any) => {
            if (this.value.indexOf(x.value) > -1) {
                x.checked = true;
            } else {
                x.checked = false;
            }
        })
    }

    ngAfterContentInit() {
        if (this.CheckBoxs == null) return;

        this.CheckBoxs.forEach((x: any) => {
            if (this.value.indexOf(x.value) > -1) {
                x.checked = true;
            } else {
                x.checked = false;
            }
            x.onClick = this.childClick.bind(this, x)
        })
    }
    ngOnChanges(changes: any) {
        if ('value' in changes) {
            this.Init();
        }
    }
}
