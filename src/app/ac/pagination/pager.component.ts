import { Component, Input, OnInit ,Output,EventEmitter} from '@angular/core';

function classNames(obj: Pagination) {

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
    selector: 'Pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.css']
})
export class Pagination  implements OnInit {
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
