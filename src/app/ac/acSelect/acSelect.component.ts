import { Component, Input, OnInit, ElementRef, ViewChild, Output, EventEmitter, ContentChildren, QueryList, ViewChildren, OnChanges } from '@angular/core';
// import KeyCode from 'rc-util/lib/KeyCode';
import { Trigger } from '../trigger/';

import Option from './option.component';
import { contains, stopDefault, stopBubble,waining } from '../util/util';

type Size = 'large' | 'small' | 'default';

@Component({
    selector: 'acSelect',
    templateUrl: './acSelect.component.html',
})
export default class Select implements OnInit {
    @ViewChild('content') content: ElementRef;
    @ViewChild('inputSearch') inputSearch: ElementRef;
    @ViewChild(Trigger) Trigger: Trigger;
    @Input() showSearch: any = null;
    @Input() className: string = '';
    @Input() placeholder: string = '';
    @Input() width: any = '';
    @Input() data: any[] = [];
    _data: any[] = [];
    @Input() size: Size = 'default'
    get sizeClass() {
        switch (this.size) {
            case 'large': return 'ant-select ant-select-lg';
            case 'default': return 'ant-select';
            case 'small': return 'ant-select ant-select-sm';
            default: return 'ant-select';

        }
    }

    @Output() onChange = new EventEmitter();
    @Output() valueChange = new EventEmitter();
    @ContentChildren(Option)
    childCmps: QueryList<Output>;

    opened = false;
    focused = false;
    @Input() value: any = null;
    selectLabel = ""
    ngOnInit() {
        //  this.width = parseInt(this.width);
    }
    onClick(e: any) {
        this.opened = !this.opened;
        this.focused = !this.focused;

        if (this.opened && (this.showSearch || this.showSearch == '')) {
            setTimeout(() => {
                this.inputSearch.nativeElement.focus();
            })
        }
    }
    _searchValue = "";
    get searchValue() {
        return this._searchValue;
    }
    set searchValue(value: any) {
        this._searchValue = value;
        this._data = this.data.filter((x) => {
            if (x.label.toLowerCase().indexOf(this._searchValue.toLowerCase()) > -1) {
                return true;
            }
        })
    }
    inputSearchClick(event: any) {
        stopBubble(event)
    }
    @Input() dropdownMatchSelectWidth = true;
    get contentStyle() {
        if (this.width == null) {
            return {}
        } else {
            if (this.width.toString().indexOf('%') > -1) {
                return { width: this.width }
            } else {
                return { width: this.width + 'px' }
            }

        }

    }
    get tipStyle() {

        if (!this.dropdownMatchSelectWidth) {
            return { top: '0px', left: '0px', position: 'relative' };
        } else {

            //if (this.width == null||this.width=='') { console.warn('width is null') }
            if (this.width.toString().indexOf('%') > -1) {
                let width = this.content.nativeElement.offsetWidth
                return { top: '0px', left: '0px', position: 'relative', width: width + 'px' }
            } else {
                if (this.width == null || this.width == '') {
                //    waining(true,'width is null')
                    let width = this.content.nativeElement.offsetWidth
                    return { top: '0px', left: '0px', position: 'relative', width: width + 'px' }
                }else{
                    return { top: '0px', left: '0px', position: 'relative', width: this.width + 'px' }
                }
            }

        }
    }

    get SearchStyle() {
        if (this.showSearch || this.showSearch == '') {
            if (this.opened) {
                return { display: 'block' }
            } else {
                return { display: 'none' }
            }
        }
        return { display: 'none' }
    }
    get valueStyle() {
        if (this.showSearch || this.showSearch == '') {
            if (this.opened) {
                return { display: 'block', opacity: 0.4 }
            } else {
                return { display: 'block', opacity: 1 }
            }
        }
        return { display: 'block', opacity: 1 }
    }

    get contentClass() {
        return `${this.sizeClass}${!this.opened ? '' : ' ant-select-open'}${!this.focused ? '' : ' ant-select-focused'} ant-select-enabled${' ' + this.className}`
    }

    childClick(x: any) {
        this.onChange.emit(x.value);
        this.valueChange.emit(x.value);
        this.opened = false;
        setTimeout(function () {
            this.focused = true
        });

    }
    ngAfterContentInit() {

        this._data.map((x) => {
            if (x.value == this.value) {
                x.selected = true;
                this.value = x.value;
                this.selectLabel = x.label;
            } else {
                x.selected = false;
            }
        })


        if (this.childCmps == null) return;
        this.childCmps.map((x: any) => {
            if (x.value == this.value) {
                x.selected = true;
                this.value = x.value;
                this.selectLabel = x.label;
            } else {
                x.selected = false;
            }
            x.click = this.childClick.bind(this, x)
            return x;
        })

    }
    ngAfterViewInit() {
        document.body.addEventListener('click', this.domClick.bind(this), false)

    }
    domClick(e: any) {
        if (this.opened == false) { return; }
        var target = e.target || e.srcElement;
        if (contains(this.content.nativeElement, target)) {

        } else {
            this.opened = false
            this.focused = false
            this.Trigger.open = false;
        }
    }


    ngOnChanges(changes: any) {
        if ('data' in changes) {
            this['_data'] = changes['data'].currentValue;
        }
        this.ngAfterContentInit()
    }
    ngOnDestroy() {
        this.opened = false;
    }
}
