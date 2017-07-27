import { Component, Input, OnInit, ElementRef, ViewChild, EventEmitter, Output, ContentChildren, QueryList, ContentChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
// import KeyCode from 'rc-util/lib/KeyCode';
import { format, toBoolean ,stopBubble} from '../util/util';

@Component({
    selector: 'acOption',
    templateUrl: './option.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export default class Option {

    @Input() value: any = '';
    @Input() label: string = '';
    @Input() selected = false;
    @Input() @format(toBoolean) disabled = false;

    @Output() onClick = new EventEmitter();
    get Tclass() {

        return {
            [`ant-select-dropdown-menu-item`]: true,
            [`ant-select-dropdown-menu-item-selected`]: this.selected,
            [`ant-select-dropdown-menu-item-disabled`]: this.disabled,
        }

    }
    constructor(private cdRef: ChangeDetectorRef) {

    }

    click(e) {
        if (!this.disabled) {
            this.onClick.emit(this)
        }
        stopBubble(e)
    }
    // ngAfterContentInit() {

    //     console.dir(this.l);
    // }
}
