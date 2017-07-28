import { Component, Input, OnChanges, Output, EventEmitter, QueryList, ContentChildren ,ChangeDetectionStrategy} from '@angular/core';
import { CheckBox } from './checkbox'
import * as clonedeep from 'lodash.clonedeep'
@Component({
    selector: 'CheckGroup',
    template: `<div  [ngClass]="Tclass" [ngStyle]="style">
       <ng-content></ng-content>
    </div>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
// @classDecorator
export class CheckBoxGroup implements OnChanges {
    @ContentChildren(CheckBox) CheckBoxs: QueryList<CheckBox>;
    @Input() style: any = {};

    get Tclass() {
        return {
            [`ant-checkbox-group`]: true,
            [`${this.className}`]: !!this.className
        }
    }

    @Input() className: string;

    @Input() value: any[];
    @Input() options: string[];
    @Output() valueChange = new EventEmitter();


    childClick(x) {
        if (x.checked) {
            //    x.checked = false
            let index = this.value.indexOf(x.value);
            this.value.splice(index, 1)
        } else {
            //    x.checked = true;
            this.value.push(x.value)

        }
        this.valueChange.emit(clonedeep(this.value));
    }

    Init() {

        if (this.CheckBoxs == null) return;
        this.CheckBoxs.forEach((x: any) => {
            if (this.value.indexOf(x.value) > -1) {
                x.checked = true;
            } else {
                x.checked = false;
            }
            x.cdRef.markForCheck();
        })
    }

    ngAfterContentInit() {
        if (this.CheckBoxs == null) return;
        this.Init()
        this.CheckBoxs.forEach((x: any) => {
            x.checkedChange.subscribe(this.childClick.bind(this, x))
        })
    }
    ngOnChanges(changes: any) {
        if ('value' in changes) {
            this.Init();
        }
    }
}
