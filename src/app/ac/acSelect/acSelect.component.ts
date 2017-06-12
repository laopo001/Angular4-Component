import { Component, Input, OnInit, ElementRef, ViewChild, Output, EventEmitter, ContentChildren, QueryList, ViewChildren } from '@angular/core';
// import KeyCode from 'rc-util/lib/KeyCode';

import Option from './option.component';
import { contains } from '../util/util';

@Component({
    selector: 'acSelect',
    templateUrl: './acSelect.component.html',
})
export default class Select implements OnInit {
    @ViewChild('content') content: ElementRef;
    @ViewChildren(Option) options:  QueryList<Output>;

    @Input() placeholder: string = '';
    @Input() width: any = null;
    @Input() data: any[] = [];

    @Output() onChange = new EventEmitter();
    @Output() valueChange = new EventEmitter();
    @ContentChildren(Option)
    childCmps: QueryList<Output>;
    opened = false;
    @Input() value: any = null;
    selectLabel = ""
    ngOnInit() {
        this.width = parseInt(this.width);
    }
    onClick() {
        this.opened = !this.opened;
    }
    @Input() dropdownMatchSelectWidth = true;
    get contentStyle() {
        if (this.width == null) {
            return {}
        } else {
            return { width: this.width + 'px' }
        }



    }
    get tipStyle() {
        if (!this.dropdownMatchSelectWidth) {
            return { top: '0px', left: '0px', position: 'relative' };
        } else {
            if(this.width==null){console.warn('width is null')}
            return { top: '0px', left: '0px', position: 'relative', width: this.width + 'px' }
        }
    }
    ngAfterViewInit(){
        console.log(this.options,this.options.length)
    }
    ngAfterContentInit() {

        if (this.childCmps == null) return;
        this.childCmps.map((x: any) => {
            if (x.value == this.value) {
                x.selected = true;
                this.value = x.value;
                this.selectLabel = x.label;
            } else {
                x.selected = false;
            }
            x.click = () => {

                this.onChange.emit(x.value);
                this.valueChange.emit(x.value);
                this.opened = false;
            }
            return x;
        })
        document.body.addEventListener('click', (e) => {
            var target = e.target || e.srcElement;
            if (contains(this.content.nativeElement, target)) {

            } else {
                this.opened = false
            }
        }, false)
    }

    ngOnChanges(changes: any) {

        for (var key in changes) {
            this[key] = changes[key].currentValue;
        }
        this.ngAfterContentInit()
    }
}
