
import { Component, OnInit, Input, ContentChild, QueryList, HostBinding, TemplateRef } from '@angular/core';
import { toBoolean } from '../util/util'
import { acInput, acTextArea } from '../input/'
import { RadioComponent, RadioGroupComponent } from '../radio/'
import { CheckBox, CheckBoxGroup } from '../checkbox/'
import Select from '../acSelect/'

var Schema = require('async-validate')

require('async-validate/plugin/all');



@Component({
    selector: 'FormItem',
    template: `
   
        <div Row className="ant-form-item">
            <div className="ant-form-item-label" Col [xs]="_labelCol.xs" [sm]="_labelCol.sm" [md]="_labelCol.md" [lg]="_labelCol.lg" [xl]="_labelCol.xl">
            <label *ngIf="label" for="password" [ngClass]="requiredClass" title="{{label}}" [ngOut]="labelOutput"></label>
            </div>
            <div className="ant-form-item-control-wrapper" Col [xs]="_wrapperCol.xs" [sm]="_wrapperCol.sm" [md]="_wrapperCol.md" [lg]="_wrapperCol.lg" [xl]="_wrapperCol.xl">
                    <div [ngClass]="ant_form_item_control_class">
                        <ng-content></ng-content>
                        <div *ngIf="validateStatus==='error'" class="ant-form-explain">{{err_message}}</div>
                    </div>
            </div>
        </div>
 
    `,
    styles: [`
  
  `]
})
export class FormItemComponent implements OnInit {
    @ContentChild(acInput) acInput: acInput;

    @ContentChild(RadioComponent) Radio: RadioComponent;
    @ContentChild(RadioGroupComponent) RadioGroup: RadioGroupComponent;
    @ContentChild(CheckBox) CheckBox: CheckBox;
    @ContentChild(CheckBoxGroup) CheckBoxGroup: CheckBoxGroup;

    @ContentChild(acTextArea) acTextArea: acTextArea;
    @ContentChild(Select) Select: Select;



    @Input() toSuccess: boolean;
    valuePropName = 'value'
    @Input() label: string;
    @Input() hasFeedback: any = true;
    @Input() validateStatus: string = '';
    // has_error=false;
    err_message = '';
    //status= 'success' 'warning' 'error' 'validating'
    get ant_form_item_control_class() {
        return {
            [`ant-form-item-control`]: true,
            [`is-validating`]: this.validateStatus === 'validating',
            [`has-success`]: this.validateStatus === 'success',
            [`has-warning`]: this.validateStatus === 'warning',
            [`has-error`]: this.validateStatus === 'error',
            [`has-feedback`]: toBoolean(this.hasFeedback)


        }
    }
    @Input() async: any
    @Input() descriptor: any;
    // @Input() type: string = 'string';
    // @Input() rules: any;
    @Input() labelTemplate: string | TemplateRef<any>;
    get labelOutput() {
        return this.labelTemplate || this.label;
    }
    @Input() required: boolean;

    get requiredClass() {
        return {
            [`ant-form-item-required`]: !!this.required
        }
    }
    @Input()
    set labelCol(x) {
        this._labelCol = Object.assign({}, this._labelCol, x)
    }
    @Input()
    set wrapperCol(x) {
        this._wrapperCol = Object.assign({}, this._wrapperCol, x)
    }

    _labelCol = {
        xs: 24,
        sm: 6,
        md: 0,
        lg: 0,
        xl: 0
    }
    _wrapperCol = {
        xs: 24,
        sm: 14,
        md: 0,
        lg: 0,
        xl: 0
    }
    @Input() className: string = ''


    Init() {
        this.required = toBoolean(this.required);
        this.toSuccess = toBoolean(this.toSuccess);
    }


    ngOnInit() {
    }
    get CurrContent() {
        let res = null;
        if (this.acInput != null) {
            res = this.acInput;
            this.valuePropName = 'value';
        }

        if (this.Radio != null) {
            res = this.Radio;
            this.valuePropName = 'checked';
        }
        if (this.RadioGroup != null) {
            res = this.RadioGroup;
            this.valuePropName = 'value';
        }
        if (this.CheckBox != null) {
            res = this.CheckBox;
            this.valuePropName = 'checked';
        }
        if (this.CheckBoxGroup != null) {
            res = this.CheckBoxGroup;
            this.valuePropName = 'value';
        }


        if (this.acTextArea != null) {
            res = this.acTextArea;
            this.valuePropName = 'value';
        }
        if (this.Select != null) {
            res = this.Select;
            this.valuePropName = 'value';
        }
        return res;
    }
    validate(value?) {
        return new Promise((resolve, reject) => {
            if (this.toSuccess) {
                this.validateStatus = 'success'
                resolve(this.validateStatus);
                return;
            }

            if (this.descriptor.type === 'custom') {
                let cb = (res) => {
                    if (res) {
                        this.validateStatus = 'success';
                    } else {
                        this.validateStatus = 'error';
                        this.err_message = this.descriptor.message
                    }
                    resolve(this.validateStatus)
                }
                this.validateStatus = 'validating';
                this.descriptor.validate(cb, value, Schema)
            } else {

                if (this.CurrContent[this.valuePropName] == null) return;
                let schema = new Schema(Object.assign({ type: 'string', }, this.descriptor))
                let source = value || this.CurrContent[this.valuePropName];
                schema.validate(source, (err, res) => {
                    if (err) {
                        throw err;
                        // this.err_message = err || this.descriptor.message ;
                    } else {
                        if (res) {
                            this.validateStatus = 'error';
                            this.err_message = this.descriptor.message || res.errors.map(x => x.message).join(';')
                            //console.dir(res.errors)
                        } else {
                            this.validateStatus = 'success';
                        }
                    }
                    resolve(this.validateStatus)
                });
            }
        })


    }

    ngAfterContentInit() {
        if (this.async != null) {
            this.async.subscribe((x) => {
                setTimeout(() => {
                    this.validate()
                })

            })
            return;
        }
        if (this.CurrContent != null && (this.descriptor != null || this.toSuccess)) {
            this.CurrContent[this.valuePropName + 'Change'].subscribe((value) => {
                this.validate(value);
            })
        }
    }
    ngOnChanges(changes: any) {
        this.Init();
    }
}
