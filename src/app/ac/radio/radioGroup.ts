
import { Component, OnInit, Input, ContentChildren, QueryList, HostBinding, TemplateRef, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { toBoolean } from '../util/util'
import { RadioComponent } from './radio'

@Component({
    selector: 'RadioGroup',
    template: `
        <div class="ant-radio-group">
            <ng-content></ng-content>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RadioGroupComponent implements OnInit {
    @Input() value: any
    @ContentChildren(RadioComponent) radios: QueryList<RadioComponent>;
    @Output() valueChange = new EventEmitter();

    ngOnInit() {

    }

    childClick(x) {
        this.valueChange.emit(x.value);
    }

    Init() {
        if (this.radios == null) return;
        this.radios.forEach((x: any) => {
            if (x.value == this.value) {
                x.checked = true;
            } else {
                x.checked = false;
            }
            x.cdRef.markForCheck();
        })
    }

    ngAfterContentInit() {
        if (this.radios == null) return;
        this.Init();
        this.radios.forEach((x: any) => {
            x.checkedChange.subscribe(this.childClick.bind(this, x))
        })
    }
    ngOnChanges(changes: any) {
        if ('value' in changes) {
            this.Init();
        }
        // this.ngAfterContentInit()
    }
}
