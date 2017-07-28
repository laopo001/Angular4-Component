
import { Component, OnInit, Input, Output, ContentChildren, QueryList, HostBinding, ChangeDetectorRef, ChangeDetectionStrategy, TemplateRef, EventEmitter, ViewChild } from '@angular/core';
import { toBoolean, format } from '../util/util'
var classnames = require('classnames');

@Component({
    selector: 'Radio',
    template: `
        <label class="ant-radio-wrapper" (click)="handClick($event)">
            <span [ngClass]="radioClass">
                <!--<input type="radio" class="ant-radio-input" value="on"> -->
                    <span class="ant-radio-inner">
                    </span>
                </span>
            <span #ngContent [style.display]="show_ngContent ? 'inline-block' : 'none'"><ng-content></ng-content></span>
        </label>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RadioComponent implements OnInit {
    @Input() @format(toBoolean) checked = false;
    @ViewChild('ngContent') ngContent;
    show_ngContent = true;
    //   @Input() label = '';
    @Input() @format(toBoolean) disabled = false;
    @Input() value: any;
    @Output() checkedChange = new EventEmitter();
    valueChange = new EventEmitter();
    constructor(private cdRef: ChangeDetectorRef) {
    }
    handClick($event) {
        //   this.checked = true;
        if (!this.disabled) {
            this.checkedChange.emit(true);
        }

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

    ngOnChanges(changes: any) {

    }
    ngAfterContentInit() {
        this.show_ngContent = this.ngContent.nativeElement.childNodes.length > 0
    }
}
