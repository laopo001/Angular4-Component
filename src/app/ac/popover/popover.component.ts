import { Component, Input, OnInit, ElementRef, ViewChild, TemplateRef, Output, EventEmitter, ContentChildren, QueryList } from '@angular/core';
import { contains, stopDefault, stopBubble } from '../util/util';
import { acTrigger } from '../acTrigger/';
var Tether = require('tether');
type Direction = 'top' | 'right' | 'bottom' | 'left';
const attachments = <{ [key: string]: any }>{
    top: { attachment: 'bottom center', offset: '0 0', opposite: 'bottom' },
    left: { attachment: 'middle right', offset: '0 0', opposite: 'right' },
    right: { attachment: 'middle left', offset: '0 0', opposite: 'left' },
    bottom: { attachment: 'top center', offset: '0 0', opposite: 'top' },

    bottomRight: { attachment: 'top right', offset: '0 0', opposite: 'topRight' },
    topRight: { attachment: 'bottom right', offset: '0 0', opposite: 'bottomRight' },

    bottomLeft: { attachment: 'top left', offset: '0 0', opposite: 'topLeft' },
    topLeft: { attachment: 'bottom left', offset: '0 0', opposite: 'bottomLeft' },

    rightBottom: { attachment: 'left bottom', offset: '0 0', opposite: 'leftBottom' },
    leftBottom: { attachment: 'right bottom', offset: '0 0', opposite: 'rightBottom' },

    rightTop: { attachment: 'left top', offset: '0 0', opposite: 'leftTop' },
    leftTop: { attachment: 'right top', offset: '0 0', opposite: 'rightTop' },


};

const PLACEMENTS = Object.keys(attachments).reduce((placements: any, direction: Direction) => {
    const { attachment, offset, opposite } = attachments[direction];
    const targetAttachment = attachments[opposite].attachment;

    placements[direction] = { opposite, attachment, targetAttachment, offset };
    return placements;
}, {});

function placement(direction: Direction) {
    return PLACEMENTS[direction];
}
type Method = 'click' | 'hover' | 'focus';


@Component({
    selector: 'Popover',
    templateUrl: './popover.component.html',
    styleUrls: ['./popover.component.scss']
})
export default class Popover implements OnInit {
    @ViewChild(acTrigger) acTrigger: acTrigger;
    @ViewChild('dom') dom: ElementRef;
    opened = false;
    @Input() header: any;
    @Input() content: any;
    stopBubble(e: any) {
        stopBubble(e);
    }

    _show: boolean = false;
    @Input('show') show: any;
    @Output() showChange = new EventEmitter();

    //show: boolean = false;
    private tether = Tether;
    @Input() placement: Direction = 'bottom';
  //  placementClass = "ant-popover ant-popover-placement-bottom"
    get placementClass(){
        return `ant-popover ant-popover-placement-${this.placement}`
    }
    @ViewChild('tip') showDom: ElementRef;
    @Input() trigger: Method = 'click';
    @Input() style: any;

    @Input() class: string;
    showStyle = { position: 'fixed', top: '0px', left: '0px', visibility: this.show ? 'visible' : 'hidden' };
    showTitle = false;


    constructor(private myElement: ElementRef) {

    }
    setShowStyle() {
        this.showStyle = { position: 'fixed', top: '0px', left: '0px', visibility: this.show ? 'visible' : 'hidden' };
    }


    ngOnInit() {
     //   this.placementClass = `ant-popover ant-popover-placement-${this.placement}`
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
            this.opened = false;
            this.showChange.emit(this.opened)
            this.acTrigger.open = false;
            // if (contains(this.showDom.nativeElement, target)) {
            // } else {
            //     this.show = false;
            //     this.setShowStyle();
            //     this.showChange.emit(this.show)
            // }
        }

    }
    onHover() {
        // var content = this.dom.content;
        // document.body.addEventListener('mouseover', (e) => {
        //     var target = e.target || e.srcElement;

        //     if (contains(content, target)) {

        //         this.show = true;
        //         this.setShowStyle();
        //         this.setTether();
        //         this.showChange.emit(this.show)
        //     } else {
        //         if (contains(this.showDom.nativeElement, target)) {

        //         } else {
        //             this.show = false;
        //             this.setShowStyle();
        //             this.showChange.emit(this.show)
        //         }
        //     }

        // }, false)
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
