import { Component, Input, OnChanges, Output, EventEmitter, ViewChild,ChangeDetectionStrategy,ChangeDetectorRef ,ElementRef} from '@angular/core';

import { toBoolean,format } from '../util/util'

@Component({
    selector: 'Check',
    templateUrl: './checkbox.html',
//    styleUrls: ['./checkbox.scss'],
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class CheckBox implements OnChanges {
    @Input() @format(toBoolean) disabled: boolean = false;
    @Input() value: any ;
    
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
        //this.cdRef.markForCheck();
    }
    constructor(private cdRef: ChangeDetectorRef,private element: ElementRef){
        
    }
    get currClasses() {
        return {
            [`ant-checkbox`]: true,
            [`ant-checkbox-disabled`]: this.disabled,
            [`ant-checkbox-checked`]: this.checked,
            [`ant-checkbox-indeterminate`]: (this.indeterminate),
            [`${this.className}`]: !!this.className
        }
    };

    ngAfterContentInit() {
        this.show_ngContent = this.ngContent.nativeElement.childNodes.length > 0;
    }

}
