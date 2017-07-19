import { Component, Input, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';

import { toBoolean,format } from '../util/util'

@Component({
    selector: 'Check',
    templateUrl: './checkbox.html',
    styleUrls: ['./checkbox.scss']
})
export class CheckBox implements OnInit {
    @Input() @format(toBoolean) disabled: boolean = false;
    @Input() value: any =[];
    
    @Input() @format(toBoolean) checked: boolean = false;
    @Input() className: string;
    @Input() indeterminate: boolean = false;
    @Output() checkedChange = new EventEmitter();
    @Output() onChange = new EventEmitter();
    @ViewChild('ngContent') ngContent;
    show_ngContent = true;
    onClick() {
        this.checkedChange.emit(!this.checked)
        this.onChange.emit(!this.checked)
    }
    ngOnChanges(changes: any) {
    
        // this.checked = toBoolean(this.checked)
        // this.disabled = toBoolean(this.disabled)
    }
    ngOnInit() {
    }
    get currClasses() {
        return {
            [`ant-checkbox`]: true,
            [`ant-checkbox-disabled`]: this.disabled,
            [`ant-checkbox-checked`]: this.checked,
            [`ant-checkbox-indeterminate`]: (!this.checked && this.indeterminate),
            [`${this.className}`]: !!this.className
        }
    };

    ngAfterContentInit() {

        this.show_ngContent = this.ngContent.nativeElement.childNodes.length > 0;
    }

}
