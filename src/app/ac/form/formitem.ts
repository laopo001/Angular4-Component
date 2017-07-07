
import { Component, OnInit, Input, ContentChildren, QueryList, HostBinding, TemplateRef } from '@angular/core';
import { toBoolean } from '../util/util'


@Component({
    selector: 'FormItem',
    template: `
   
        <div Row className="ant-form-item">
            <div className="ant-form-item-label" Col [xs]="_labelCol.xs" [sm]="_labelCol.sm" [md]="_labelCol.md" [lg]="_labelCol.lg" [xl]="_labelCol.xl">
            <label *ngIf="label" for="password" [ngClass]="requiredClass" title="{{label}}" [nglInternalOutlet]="labelOutput"></label>
            </div>
            <div className="ant-form-item-control-wrapper" Col [xs]="_wrapperCol.xs" [sm]="_wrapperCol.sm" [md]="_wrapperCol.md" [lg]="_wrapperCol.lg" [xl]="_wrapperCol.xl">
                    <div class="ant-form-item-control ">
                        <ng-content></ng-content>
                        
                    </div>
            </div>
        </div>
 
    `,
    styles: [`
  
  `]
})
export  class FormItemComponent implements OnInit {

    @Input() label: string;
    @Input() labelTemplate: string | TemplateRef<any>;
    get labelOutput() {
        return this.labelTemplate || this.label;
    }
    @Input() require: boolean;

    get requiredClass() {
        return {
            [`ant-form-item-required`]: !!this.require
        }
    }
    @Input()
    set labelCol(x){
        this._labelCol=Object.assign({},this._labelCol,x)
    }
    @Input() 
    set wrapperCol(x){
        this._wrapperCol=Object.assign({},this._wrapperCol,x)
    }

    _labelCol={
        xs:24,
        sm:6,
        md:0,
        lg:0,
        xl:0
    }
    _wrapperCol={
        xs:24,
        sm:14,
        md:0,
        lg:0,
        xl:0
    }
    @Input() className: string = ''


    Init() {
        this.require = toBoolean(this.require)
    }


    ngOnInit() {

    }
    ngOnChanges(changes: any) {
        this.Init();
    }
}
