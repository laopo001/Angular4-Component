//create time:Wed Jun 07 2017 16:07:07 GMT+0800 (中国标准时间)
import { Component, OnInit, Input, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
var Tether = require('tether');


var contains = function (root: any, el: any) {
    if (root.compareDocumentPosition)
        return root === el || !!(root.compareDocumentPosition(el) & 16);
    if (root.contains && el.nodeType === 1) {
        return root.contains(el) && root !== el;
    }
    while ((el = el.parentNode))
        if (el === root) return true;
    return false;
}
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
type Method = 'click' | 'hover' | 'focus' | 'focusClick';

@Component({
    selector: 'Trigger',
    templateUrl: './trigger.component.html',
    styleUrls: ['./trigger.component.scss']
})
export default class TriggerComponent implements OnInit {
    @ViewChild('showDom') showDom: ElementRef;
    _show: boolean = false;
    @Input('show')
    set show(x: any) {
        this._show = x;
    }
    @Input() placement: Direction = 'bottom';
    get show() {
        return this._show;
    }
    dom: any = {
        content: null
    }
    showStyle = { position: 'fixed', top: '0px', zIndex: 1001, left: '0px', visibility: this.show ? 'visible' : 'hidden' };
    @Input() trigger: Method = 'click';

    @Output() showChange = new EventEmitter();
    constructor(private myElement: ElementRef) {

    }
    ngOnInit() {


    }
    ngAfterContentInit() {
        this.dom.content = this.myElement.nativeElement.querySelector('[content]');
        if (this.dom.content == null) { console.warn('content没定义') }

        this.setShowStyle();
        if (this.myElement.nativeElement.querySelector('[show]') != null) {
            this.setTether();
            switch (this.trigger) {
                case 'click': this.onClick(); break;
                case 'hover': this.onHover(); break;
                case 'focus': this.onFocus(); break;
                case 'focusClick': this.onfocusClick(); break;
            }
        }
    }
    private tether = Tether;
    private setTether() {
        if (!this.tether) return;

        const { attachment, targetAttachment, offset } = placement(this.placement);
        const options = {
            element: this.showDom.nativeElement,
            target: this.dom.content,
            attachment,
            targetAttachment,
            offset,
            constraints: [
                {
                    to: 'window',
                    attachment: 'together'
                }
            ]
        };
        setTimeout(()=>{
            this.tether = new Tether(options);
        })


    }
    setShowStyle() {
        this.showStyle = { position: 'fixed', top: '0px', zIndex: 1001, left: '0px', visibility: this.show ? 'visible' : 'hidden' };
    }
    onClick() {
        var content = this.dom.content;
        document.body.addEventListener('click', (e) => {
            var target = e.target || e.srcElement;
            if (contains(content, target)) {

                if (this.show) {
                    this.show = false;
                    this.setShowStyle();
                    this.showChange.emit(this.show)
                } else {
                    this.show = true;
                    this.setShowStyle();
                    this.setTether();
                    this.showChange.emit(this.show)
                }
            } else {
                if (contains(this.showDom.nativeElement, target)) {

                } else {
                    this.show = false;
                    this.setShowStyle();
                    this.showChange.emit(this.show)
                }
            }
        }, false)
    }
    onfocusClick() {
        var content = this.dom.content;
        document.body.addEventListener('click', (e) => {
            var target = e.target || e.srcElement;
            if (contains(content, target)) {
                if (this.show) {
                    this.show = false;
                    this.setShowStyle();
                    this.showChange.emit(this.show)
                } else {
                    this.show = true;
                    this.setShowStyle();
                   // this.setTether();
                    this.showChange.emit(this.show)
                }
            } else {

                this.show = false;
                this.setShowStyle();
                this.showChange.emit(this.show)
            }
        }, false)
    }
    onHover() {
        var content = this.dom.content;
        document.body.addEventListener('mouseover', (e) => {
            var target = e.target || e.srcElement;

            if (contains(content, target)) {

                this.show = true;
                this.setShowStyle();
                this.setTether();
                this.showChange.emit(this.show)
            } else {
                if (contains(this.showDom.nativeElement, target)) {

                } else {
                    this.show = false;
                    this.setShowStyle();
                    this.showChange.emit(this.show)
                }
            }

        }, false)
    }
    onFocus() {
        var content = this.dom.content;
        content.addEventListener('focus', () => {
            this.show = true;
            this.setShowStyle();
            this.setTether();
            this.showChange.emit(this.show)
        }, false)
        content.addEventListener('blur', () => {
            this.show = false;
            this.setShowStyle();
            this.showChange.emit(this.show)
        }, false)
    }
}
