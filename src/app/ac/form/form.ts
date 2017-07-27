
import { Component, OnInit, Input, Output, ContentChildren, QueryList, HostBinding, TemplateRef, HostListener, EventEmitter } from '@angular/core';
import { toBoolean } from '../util/util'
import { FormItemComponent } from './formitem'
var classnames = require('classnames');

@Component({
    selector: 'Form',
    template: `
        <ng-content></ng-content>

    `,
    styles: [`
  
  `]
})
export class FormComponent implements OnInit {
    @ContentChildren(FormItemComponent) FormItems: QueryList<FormItemComponent>;
    @HostBinding('class')
    get HostClass() {
        return classnames({
            [`ant-form `]: true,
            [`ant-form-${this.layout}`]: !!this.layout
        });
    }
    @Output() onSubmit = new EventEmitter<any>();
    @Input() layout: 'horizontal' | 'vertical' | 'inline' = "horizontal"

    Init() {

    }
    @HostListener('submit', ['$event'])
    submit(e) {
        e.preventDefault();
        let run = async () => {
            let err = [];
            for (let x of this.FormItems['_results']) {
                if (x.descriptor != null || x.toSuccess) {
                    
                    await x.validate()
                    if (x.validateStatus === 'error') {
                        err.push(x.err_message)
                    }

                }

            }
            return err;

        }
        run().then((errs) => {
            this.onSubmit.emit(errs)
        }).catch((e) => {
            console.error(e)
        })


        // let err = [];
        // for (let x of this.FormItems['_results']) {
        //     if (x.descriptor != null || x.toSuccess) {

        //         await x.validate()
        //         if (x.validateStatus === 'error') {
        //             err.push(x.err_message)
        //         }

        //         // await x.validate()
        //         // if (x.validateStatus === 'error') {
        //         //     err.push(x.err_message)
        //         // }
        //     }
        //     // if(x.toSuccess){
        //     //     x.validateStatus='success'
        //     // }
        // }
        // this.onSubmit.emit(err)
    }

    ngOnInit() {

    }
    ngOnChanges(changes: any) {
        this.Init();
    }

}
