import { Component, Input, OnInit } from '@angular/core';

var classnames = require('classnames');



function isCombobox(props: any) {
    return props.combobox;
}

function isMultipleOrTags(props: any) {
    return props.multiple || props.tags;
}
function isMultipleOrTagsOrCombobox(props: any) {
    return isMultipleOrTags(props) || isCombobox(props);
}
function isSingleMode(props: any) {
    return !isMultipleOrTagsOrCombobox(props);
}
function chaining(...fns:any[]) {
  return function (...args:any[]) {
    for (let i = 0; i < fns.length; i++) {
      if (fns[i] && typeof fns[i] === 'function') {
        fns[i].apply(this, args);
      }
    }
  };
}


@Component({
    selector: 'acSelect',
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.css']
})
export class Select implements OnInit {

    UNSELECTABLE_STYLE = {
        userSelect: 'none',
        WebkitUserSelect: 'none',
    };
    UNSELECTABLE_ATTRIBUTE = {
        unselectable: 'unselectable',
    };
    @Input() style: any;
    @Input() class: string;
    @Input() disabled: boolean;
    @Input() allowClear: boolean;
    @Input() showSearch: boolean = false;
    selectionClasses = "";
    singleValueClass = ""
    _focused: boolean
    rootClass = "";
    prefixCls = 'ant-select'

    choiceTransitionName: 'zoom'
    transitionName = 'slide-up'

    mode?: 'default' | 'multiple' | 'tags' | 'combobox';

    open: boolean;
    inputValue = ""
    value: any[] = [{ label: '123', value: "abc" }];
    @Input() combobox: boolean;
    @Input() multiple: boolean;
    @Input() placeholder: string;
    singleValueStyle = {};
    singleValue = "";
    showSearchClass = "";
    showSearchStyle = {};
    showSearchSpanClass = "";
    selectionClass = "";
    placeholderClass="";
    placeholderStyle={};
    showPlaceholder=false;
    showSearchInputClass="";
    ngOnInit() {
        var { value, open, prefixCls, inputValue, multiple, disabled, allowClear,  combobox, choiceTransitionName, showSearch } = this;

        this.rootClass = classnames({
            class: !!this.class,
            [prefixCls]: 1,
            [`${prefixCls}-open`]: open,
            [`${prefixCls}-focused`]: open || !!this._focused,
            [`${prefixCls}-combobox`]: combobox,
            [`${prefixCls}-disabled`]: disabled,
            [`${prefixCls}-enabled`]: !disabled,
            [`${prefixCls}-allow-clear`]: !!allowClear,
        });

        this.selectionClasses = `${prefixCls}-selection ${prefixCls}-selection--${multiple ? 'multiple' : 'single'}`;

        this.singleValueClass = `${prefixCls}-selection-selected-value`;

        this.selectionClass = `${prefixCls}-selection__rendered`;
        let innerNode = null;

        if (isSingleMode(this)) {
            let selectedValue = null;
            if (value.length) {
                let showSelectedValue = false;
                let opacity = 1;
                if (!showSearch) {
                    showSelectedValue = true;
                } else {
                    if (open) {
                        showSelectedValue = !inputValue;
                        if (showSelectedValue) {
                            opacity = 0.4;
                        }
                    } else {
                        showSelectedValue = true;
                    }
                }
                this.singleValue = value[0].label;
                this.singleValueStyle = { display: showSelectedValue ? 'block' : 'none', opacity };
                
            }
        }

        if (showSearch) {
            console.log(open)
            this.showSearchClass = `${prefixCls}-search ${prefixCls}-search--inline`;
            this.showSearchStyle = { display: open ? 'block' : 'none' }
            this.showSearchInputClass=`${prefixCls}--search__field`;
            //    console.log(this.showSearchStyle)
            this.showSearchSpanClass = `${prefixCls}-search__field__mirror`
        }
        let hidden = false;
        if (inputValue) {
            hidden = true;
                }
        if (value.length) {
            hidden = true;
        }
        if (isCombobox(this) && value.length === 1 && !value[0].key) {
            hidden = false;
        }
        if(this.placeholder){
            this.placeholderClass=`${prefixCls}-selection__placeholder`;
            this.placeholderStyle={
                    display: hidden ? 'none' : 'block',
                     ...this.UNSELECTABLE_STYLE,
            }
        }
    }
    preventDefaultEvent(){

    }
    onKeyDown(event:any) {

    if (this.disabled) {
      return;
    }
    const keyCode = event.keyCode;
    if (this.open && !this.getInputDOMNode()) {
      this.onInputKeyDown(event);
    } else if (keyCode === KeyCode.ENTER || keyCode === KeyCode.DOWN) {
      this.setOpenState(true);
      event.preventDefault();
    }
  }
      onInputKeyDown(event) {
    const props = this.props;
    if (props.disabled) {
      return;
    }
    const state = this.state;
    const keyCode = event.keyCode;
    if (isMultipleOrTags(props) && !event.target.value && keyCode === KeyCode.BACKSPACE) {
      event.preventDefault();
      const { value } = state;
      if (value.length) {
        this.removeSelected(value[value.length - 1].key);
      }
      return;
    }
    if (keyCode === KeyCode.DOWN) {
      if (!state.open) {
        this.openIfHasChildren();
        event.preventDefault();
        event.stopPropagation();
        return;
      }
    } else if (keyCode === KeyCode.ESC) {
      if (state.open) {
        this.setOpenState(false);
        event.preventDefault();
        event.stopPropagation();
      }
      return;
    }
    onkeydown(){
        chaining(this.onInputKeyDown, this.onKeyDown)
    }
    onOuterBlur() {

    }
    onOuterFocus() {

    }
}
