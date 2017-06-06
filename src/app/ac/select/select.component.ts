import { Component, Input, OnInit, ElementRef, ViewChild } from '@angular/core';
// import KeyCode from 'rc-util/lib/KeyCode';
var classnames = require('classnames');
var KeyCode = require('rc-util/lib/KeyCode');


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
function chaining(...fns: any[]) {
    return function (...args: any[]) {
        for (let i = 0; i < fns.length; i++) {
            if (fns[i] && typeof fns[i] === 'function') {
                fns[i].apply(this, args);
            }
        }
    };
}
function toArray(value: any) {
    let ret = value;
    if (value === undefined) {
        ret = [];
    } else if (!Array.isArray(value)) {
        ret = [value];
    }
    return ret;
}

@Component({
    selector: 'acSelect',
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.css']
})
export default class Select implements OnInit {
    @ViewChild('topCtrlNode') topCtrlNode: ElementRef;
    @ViewChild('inputMirrorInstance') inputMirrorInstance: ElementRef;
    @ViewChild('inputInstance') inputInstance: ElementRef;
    @ViewChild('selection') selection: ElementRef;

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
    labelInValue = false;
    mode?: 'default' | 'multiple' | 'tags' | 'combobox';

    open: boolean;
    inputValue = ""
    value: any[] = [{ label: '123', value: "abc" }];
    @Input() combobox: boolean;
    @Input() multiple: boolean;
    @Input() placeholder: string;
    @Input() onSearch: any;
    @Input() onDeselect: any;
    @Input() onChange: any;



    singleValueStyle = {};
    singleValue = "";
    showSearchClass = "";
    showSearchStyle = {};
    showSearchSpanClass = "";
    selectionClass = "";
    placeholderClass = "";
    placeholderStyle = {};
    showPlaceholder = false;
    showSearchInputClass = "";

    ngOnInit() {
        var { value, open, prefixCls, inputValue, multiple, disabled, allowClear, combobox, choiceTransitionName, showSearch } = this;

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
           // console.log(open)
            this.showSearchClass = `${prefixCls}-search ${prefixCls}-search--inline`;
            this.showSearchStyle = { display: open ? 'block' : 'none' }
            this.showSearchInputClass = `${prefixCls}--search__field`;
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
        if (this.placeholder) {
            this.placeholderClass = `${prefixCls}-selection__placeholder`;
            this.placeholderStyle = {
                display: hidden ? 'none' : 'block',
                ...this.UNSELECTABLE_STYLE,
            }
        }

    }
    preventDefaultEvent() {

    }
    getInputDOMNode(): any {
        return this.topCtrlNode ?
            this.topCtrlNode.nativeElement.querySelector('input,textarea,div[contentEditable]') :
            this.inputInstance.nativeElement;
    }
    ngAfterContentInit() {
        //   console.log(this.topCtrlNode)
    }
    onKeyDown(event: any) {

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
    maybeFocus(open: any, needFocus: any) {
        if (needFocus || open) {
            const input = this.getInputDOMNode();
            const { activeElement } = document;
            if (input && (open || isMultipleOrTagsOrCombobox(this))) {
                if (activeElement !== input) {
                    input.focus();
                }
            } else {
                const selection = this.selection.nativeElement;
                if (activeElement !== selection) {
                    selection.focus();
                }
            }
        }
    }
    setOpenState(open: any, needFocus?: any) {

        if (this.open === open) {
            this.maybeFocus(open, needFocus);
            return;
        }
        const nextState = {
            open,
        };
        // clear search input value when open is false in singleMode.
        if (!open && isSingleMode(this) && this.showSearch) {
            this.setInputValue('');
        }
        if (!open) {
            this.maybeFocus(open, needFocus);
        }
        this.open = open;
        setTimeout(() => {
            if (open) {
                this.maybeFocus(open, needFocus);
            }
        }, 0)
    }
    setInputValue(inputValue: any, fireSearch = true) {
        if (inputValue !== this.inputValue) {
            this.inputValue = inputValue

            if (fireSearch) {
                this.onSearch(inputValue);
            }
        }
    }
    onInputKeyDown(event: any) {

        if (this.disabled) {
            return;
        }

        const keyCode = event.keyCode;
        if (isMultipleOrTags(this) && !event.target.value && keyCode === KeyCode.BACKSPACE) {
            event.preventDefault();
            const { value } = this;
            if (value.length) {
                this.removeSelected(value[value.length - 1].key);
            }
            return;
        }
        if (keyCode === KeyCode.DOWN) {
            if (!this.open) {
                this.openIfHasChildren();
                event.preventDefault();
                event.stopPropagation();
                return;
            }
        } else if (keyCode === KeyCode.ESC) {
            if (this.open) {
                this.setOpenState(false);
                event.preventDefault();
                event.stopPropagation();
            }
            return;
        }
    }
    removeSelected(selectedKey: any) {

        if (this.disabled || this.isChildDisabled(selectedKey)) {
            return;
        }
        let label;
        const value = this.value.filter((singleValue) => {
            if (singleValue.key === selectedKey) {
                label = singleValue.label;
            }
            return (singleValue.key !== selectedKey);
        });
        const canMultiple = isMultipleOrTags(this);

        if (canMultiple) {
            let event = selectedKey;
            if (this.labelInValue) {
                event = {
                    key: selectedKey,
                    label,
                };
            }
            this.onDeselect(event);
        }
        this.fireChange(value);
    }
    fireChange(value: any) {

        if (!('value' in this)) {
            this.value = value

        }
        this.onChange(this.getVLForOnChange(value));
    }
    getVLForOnChange(vls_: any) {
        let vls = vls_;
        if (vls !== undefined) {
            if (!this.labelInValue) {
                vls = vls.map((v: any) => v.key);
            } else {
                vls = vls.map((vl: any) => ({ key: vl.key, label: vl.label }));
            }
            return isMultipleOrTags(this) ? vls : vls[0];
        }
        return vls;
    }
    isChildDisabled(key: any) {
        // return toArray(this.children).some(child => {
        //     const childValue = getValuePropValue(child);
        //     return childValue === key && child.props && child.props.disabled;
        // });
    }
    openIfHasChildren() {

        // if (React.Children.count(props.children) || isSingleMode(props)) {
        //     this.setOpenState(true);
        // }
    }
    onkeydown() {
        //    chaining(this.onInputKeyDown, this.onKeyDown)
    }
    onOuterBlur() {

    }
    onOuterFocus() {

    }
}
