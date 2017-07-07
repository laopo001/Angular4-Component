
import { Component, OnInit, Input, ContentChildren, QueryList, HostBinding, TemplateRef, Output, EventEmitter } from '@angular/core';
import { toBoolean } from '../util/util'
import { RadioComponent } from './radio'

@Component({
    selector: 'acRadioGroup',
    template: `
        <div class="ant-radio-group">
            <ng-content></ng-content>
        </div>
    `,
    styles: [`
  
  `]
})
export class RadioGroupComponent implements OnInit {
    @Input() options: any
    @Input() value: any
    @ContentChildren(RadioComponent) radios: QueryList<RadioComponent>;
    @Output() onChange = new EventEmitter();
    @Output() valueChange = new EventEmitter();
    Init() {

    }


    ngOnInit() {

    }

    childClick(x) {

        this.onChange.emit(x.value);
        this.valueChange.emit(x.value);
    }

    ngAfterContentInit() {
        if (this.radios == null) return;
        this.radios.map((x: any) => {
            if (x.value == this.value) {
                x.checked = true;
           //     this.value = x.value || x.label;
            } else {
                x.checked = false;
            }
            x.handClick = this.childClick.bind(this, x)
            return x;
        })
    }
    ngOnChanges(changes: any) {
        this.ngAfterContentInit()
    }
}
