import { Component, Input, OnInit, ElementRef, ViewChild, EventEmitter, Output, ContentChildren, QueryList, ContentChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
// import KeyCode from 'rc-util/lib/KeyCode';


@Component({
    selector: 'acOption',
    templateUrl: './option.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export default class Option implements OnInit {

    @Input() value: any = '';
    @Input() label: string = '';
    @Input() selected = false;
    get Tclass() {

        return 'ant-select-dropdown-menu-item ' + (this.selected ? 'ant-select-dropdown-menu-item-selected' : '');
    }
    constructor(private cdRef: ChangeDetectorRef) {

    }
    ngOnInit() {

    }
    click() {

    }
    // ngAfterContentInit() {

    //     console.dir(this.l);
    // }
}
