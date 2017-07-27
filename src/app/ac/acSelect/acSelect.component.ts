import { Component, Input, OnInit, ElementRef, ViewChild, Output, EventEmitter, ContentChildren, QueryList, ViewChildren, OnChanges, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
// import KeyCode from 'rc-util/lib/KeyCode';
import { Trigger } from '../trigger/';

import Option from './option.component';
import { contains, stopDefault, stopBubble, waining, toWidth } from '../util/util';

type Size = 'large' | 'small' | 'default';

@Component({
    selector: 'acSelect',
    templateUrl: './acSelect.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
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
    constructor(private cdRef: ChangeDetectorRef) {


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
            return {
                width: toWidth(this.width)
            }
        }

    }
    get tipStyle() {
        if (!this.dropdownMatchSelectWidth) {
            return { top: '0px', left: '0px', position: 'relative' };
        } else {

            if (this.width == null || this.width == '' || this.width.indexOf('%') > -1) {
                let width = this.content.nativeElement.offsetWidth
                return { top: '0px', left: '0px', position: 'relative', width: width + 'px' }
            } else {
                return {
                    top: '0px', left: '0px', position: 'relative',
                    width: toWidth(this.width)
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
        return {
            [`ant-select`]: true,
            [`ant-select-lg`]: this.size === 'large',
            [`ant-select-sm`]: this.size === 'small',
            [`ant-select-open`]: this.opened,
            [`ant-select-focused`]: this.focused,
            [`ant-select-enabled`]: true,
            [`${this.className}`]: !!this.className,
        }
        //   return `${this.sizeClass}${!this.opened ? '' : ' ant-select-open'}${!this.focused ? '' : ' ant-select-focused'} ant-select-enabled${' ' + this.className}`;
    }

    childClick(x: any) {
        this.onChange.emit(x.value);
        this.valueChange.emit(x.value);
        this.opened = false;

        setTimeout(() => {
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
            x.cdRef.markForCheck()
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
            this.cdRef.markForCheck();
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
