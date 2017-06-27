import { Component, Input, OnInit, ElementRef, ViewChild, TemplateRef, Output, EventEmitter, ContentChildren, QueryList, ContentChild } from '@angular/core';
import { contains, stopDefault, stopBubble } from '../util/util';
import { Trigger } from '../trigger/';


type Method = 'click' | 'hover' | 'focus';


@Component({
    selector: 'Popover',
    templateUrl: './popover.component.html',
    styleUrls: ['./popover.component.scss']
})
export default class Popover implements OnInit {
    @ViewChild(Trigger) Trigger: Trigger;
    @ViewChild('dom') dom: ElementRef;
    opened = false;
    @Input('title') title: any;
    @Input() content: any;
    stopBubble(e: any) {
        stopBubble(e);
    }
    @ContentChild(TemplateRef)
    private template: TemplateRef<any>;


    _show: boolean = false;
    @Input('show') show: any = false;
    @Output() showChange = new EventEmitter();
    @ViewChild('tip') tip: TemplateRef<any>;
    @Input() placement = 'bottom';

    get placementClass() {
        return `ant-popover ant-popover-placement-${this.placement}`
    }
    @Input() trigger: Method = 'click';
    @Input() className: string;
    constructor(private myElement: ElementRef) {

    }

    ngOnInit() {

        switch (this.trigger) {
            case 'click': this.onClick(); break;
            case 'hover': this.onHover(); break;
            case 'focus': this.onFocus(); break;
        }
    }

    handClick(e: any) {
        this.opened = !this.opened;
        this.showChange.emit(this.opened)
    }
    onClick() {
        document.body.addEventListener('click', this.close.bind(this), false)
    }
    close(e: any) {

        if (this.opened == false) { return; }
        var target = e.target || e.srcElement;
        if (contains(this.dom.nativeElement, target)) {


        } else {
            if (contains(this.tip.elementRef.nativeElement, target)) {

            } else {
                this.opened = false;
                this.showChange.emit(this.opened)
                this.Trigger.open = false;
            }

        }
    }
    hover(e: any, b: boolean) {

        if (b) {
            this.opened = true;
            this.showChange.emit(this.opened)
        } else {

            this.opened = false;
            this.showChange.emit(this.opened)

        }

    }
    onHover() {

        //   document.body.addEventListener('mouseover',this.close.bind(this) , false)
    }
    onFocus() {
        // var content = this.dom.content;
        // content.addEventListener('focus', () => {
        //     this.show = true;
        //     this.setShowStyle();
        //     this.setTether();
        //     this.showChange.emit(this.show)
        // }, false)
        // content.addEventListener('blur', () => {
        //     this.show = false;
        //     this.setShowStyle();
        //     this.showChange.emit(this.show)
        // }, false)
    }
    ngOnChanges(changes: any) {

        if ('show' in changes) {
            this.opened = changes.show.currentValue;
        }
    }
    ngOnDestroy() {
        this.opened = false;
    }
}
