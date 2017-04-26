import { Component, Input, OnInit ,Output,EventEmitter,HostBinding} from '@angular/core';

function classNames(obj: Button) {

    var { prefixCls, type, shape, iconOnly, sizeCls, icon, loading, clicked, ghost } = obj;

    return {
        [`${prefixCls}`]: true,
        [`${prefixCls}-${type}`]: !!type,
        [`${prefixCls}-${shape}`]: !!shape,
        [`${prefixCls}-${sizeCls}`]: !!sizeCls,
        [`${prefixCls}-icon-only`]: iconOnly,
        [`${prefixCls}-loading`]: loading,
        [`${prefixCls}-clicked`]: clicked,
        [`${prefixCls}-background-ghost`]: ghost,

        [`${obj.class}`]: !!obj.class
    }
}

@Component({
    selector: 'acButton',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.css']
})
export class Button implements OnInit {
    @HostBinding('style.display') dis='inline-block';
    @Input() loading: boolean = false;
    @Input() clicked: boolean = false;
    @Input() ghost: boolean = false;
    @Input() iconOnly: boolean = false;
    @Input() shape: string;
    @Input() size: string;
    @Input() icon: string;
    @Input() type: string;
    @Input() htmlType: string = 'button';
    @Input() class: string;
    @Input() style: any;
    currClasses = {};
    prefixCls = 'ant-btn';
    sizeCls = '';
    iconType = "";
    timeout=0;

    @Output() onClick=new EventEmitter();
    constructor(){

    }

    ngOnInit() {
        this.sizeCls = ({
            large: 'lg',
            small: 'sm',
        })[this.size] || '';
        this.currClasses = classNames(this);
        this.iconType = this.loading ? 'loading' : this.icon;

    }
//   // Handle auto focus when click button in Chrome
//   handleMouseUp = (e) => {
//     if (this.props.onMouseUp) {
//       this.props.onMouseUp(e);
//     }
//   }
    handleClick(e:any) {
        this.clicked=true;
        this.currClasses = classNames(this);
        clearTimeout(this.timeout);
        this.timeout = Number(setTimeout(() => {
            this.clicked= false;
            this.currClasses = classNames(this);
        }, 500) );

        this.onClick.emit(e);
      //  console.log('handleClick')
    }
}
