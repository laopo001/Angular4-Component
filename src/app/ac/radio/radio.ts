
import { Component, OnInit, Input, Output, ContentChildren, QueryList, HostBinding, TemplateRef, EventEmitter, ViewChild } from '@angular/core';
import { toBoolean } from '../util/util'
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
    styles: [`
  
  `]
})
export class RadioComponent implements OnInit {
    @Input() checked = false;
    @ViewChild('ngContent') ngContent;
    show_ngContent = true;
    //   @Input() label = '';
    @Input() disabled = false;
    @Input() value: any;
    @Output() checkedChange = new EventEmitter();
    valueChange = new EventEmitter();

    handClick($event) {
     //   this.checked = true;
        this.checkedChange.emit(true);
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
        // if(this.value==null){
        //     this.value=this.label;
        // }
    }
    ngOnChanges(changes: any) {
        this.Init();
    }
    ngAfterContentInit() {
        this.show_ngContent = this.ngContent.nativeElement.childNodes.length > 0
    }
}
