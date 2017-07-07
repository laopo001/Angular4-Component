import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { toBoolean } from '../util/util'

@Component({
    selector: 'Check',
    templateUrl: './checkbox.component.html',
    styleUrls: ['./checkbox.component.scss']
})
export class CheckBox implements OnInit {
    @Input() disabled: boolean = false;
    @Input() checked: boolean = false;
    @Input() className: string;
    @Input() indeterminate: boolean = false;
    @Output() checkedChange = new EventEmitter();
    @Output() onChange = new EventEmitter();
    Init() {

        this.checked=toBoolean(this.checked)
        this.disabled=toBoolean(this.disabled)

        // if (typeof this.defaultChecked == 'string') {
        //     this.defaultChecked = true;
        // }

    }
    onClick() {
        this.checkedChange.emit(!this.checked)
        this.onChange.emit(!this.checked)
    }
    ngOnChanges(changes: any) {
        this.Init()
    }
    ngOnInit() {
    }
    get currClasses() {
        return {
            [`ant-checkbox`]: true,
            [`ant-checkbox-disabled`]: this.disabled,
            [`ant-checkbox-checked`]: this.checked,
            [`ant-checkbox-indeterminate`]: (!this.checked&&this.indeterminate),
            [`${this.className}`]:!!this.className
        }
    };

}
