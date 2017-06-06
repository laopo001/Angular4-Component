import { Component, Input, OnInit, ElementRef, ViewChild, TemplateRef, Output, EventEmitter } from '@angular/core';
// import * as Tether from 'tether';
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


@Component({
    selector: 'acTrigger',
    templateUrl: './trigger.component.html',
    styleUrls: ['./trigger.component.scss']
})
export default class Trigger implements OnInit {
    _show: boolean;
    @Input('show')
    set show(x: any) {
        this._show = x;
    }
    get show() {
        return this._show;
    }
    @Output() showChange = new EventEmitter();

    //show: boolean = false;
    private tether = Tether;
    @Input() placement: Direction = 'bottom';
    placementClass = "ant-popover ant-popover-placement-bottom"
    @ViewChild('showDom') showDom: ElementRef;
    @Input() trigger: Method;
    @Input() style: any;
    @Input() class: string;
    showStyle = { position: 'fixed', top: '0px', left: '0px', visibility: this.show ? 'visible' : 'hidden' };
    showTitle = false;

    dom: any = {
        content: null
    }

    constructor(private myElement: ElementRef) {

    }
    setShowStyle() {
        this.showStyle = { position: 'fixed', top: '0px', left: '0px', visibility: this.show ? 'visible' : 'hidden' };
    }
    private setTether() {
        if (!this.tether) return;

        const { attachment, targetAttachment, offset } = placement(this.placement);
        const options = {
            element: this.showDom.nativeElement,
            target: this.dom.content,
            attachment,
            targetAttachment,
            offset,
        };
        setTimeout(() => {
            this.tether = new Tether(options);
        })


    }

    ngOnInit() {

        this.showTitle = !!this.myElement.nativeElement.querySelector('[title]');
        this.dom.content = this.myElement.nativeElement.querySelector('[content]');
        if (this.dom.content == null) { console.warn('content没定义') }
        this.placementClass = `ant-popover ant-popover-placement-${this.placement}`

        this.setShowStyle();
        if (this.myElement.nativeElement.querySelector('[show]') != null) {
            this.setTether();
            switch (this.trigger) {
                case 'click': this.onClick(); break;
                case 'hover': this.onHover(); break;
                case 'focus': this.onFocus(); break;
            }
        }


    }
    onClick() {

        var content = this.dom.content;


        document.body.addEventListener('click', (e) => {
            var target = e.target || e.srcElement;
            // console.log(contains(this.showDom.nativeElement,target))
            // console.log(this.showDom.nativeElement)

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
        //    this.showDom.nativeElement.addEventListener('click',()=>{

        //    },false)
    }
    onHover() {

    }
    onFocus() {

    }
    ngOnChanges(changes: any) {
        //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
        //Add 'implements OnChanges' to the class.
    //    console.log(changes);
        if('show' in changes){
            this.show=changes.show.currentValue;
            this.setShowStyle();
        }
    }
    ngOnDestroy() {
        //Called once, before the instance is destroyed.
        //Add 'implements OnDestroy' to the class.
        //    console.log(24)
        this.showDom.nativeElement.style.display = "none"
        this.show = false;
        this.setShowStyle();
    }
}
