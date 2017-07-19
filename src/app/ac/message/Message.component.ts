import { Component, Input, OnInit, } from '@angular/core';
import {
    trigger,
    state,
    style,
    animate,
    transition, keyframes
} from '@angular/animations';
// import * as Rx from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable, Subject } from 'rxjs';


let list: any = []

var subject = new BehaviorSubject(list);

let id = 0;
let defaultDuration = 1.5;
let defaultTop;


function log(type: string, content: string, duration = 1500, onClose?: any) {
    id++;
    let obj = {
        type: type,
        content,
        id,
        onClose,
        state: 'in'
    }
    list = [...list, obj]

    function close() {
        list = list.filter((x: any) => {
            if (x.id == obj.id) {
                if (obj.onClose != null) { obj.onClose(); }

                return false;
            } else { return true; }
        })
        subject.next(list)
    }
    setTimeout(close, duration)
    subject.next(list)
    return close;
}

export interface ConfigOptions {
    top?: number;
    duration?: number;
}


@Component({
    selector: 'Message',
    template: `<div data-reactroot="" class="ant-message" [ngStyle]="messageStyle">
        <span >
             <ng-container *ngFor="let item of list|async">
                <div [@flyInOut]="'in'" class="ant-message-notice">
                    <div    class="ant-message-notice-content">
                        <div class="ant-message-custom-content ant-message-{{item.type}}" [ngSwitch]="item.type">
                            <i *ngSwitchCase="'success'" class="anticon anticon-check-circle"></i>
                            <i *ngSwitchCase="'error'" class="anticon anticon-cross-circle"></i>
                            <i *ngSwitchCase="'info'" class="anticon anticon-info-circle"></i>
                            <i *ngSwitchCase="'warning'" class="anticon anticon-exclamation-circle"></i>
                            <i *ngSwitchCase="'loading'" class="anticon anticon-spin anticon-loading"></i>
   
                            <span>{{item.content}}</span>
                        </div>
                    </div>
                </div>
             </ng-container>
        </span>
    </div>`,
    animations: [
        trigger('flyInOut', [
            state('in', style({ opacity: 1, transform: 'translateX(0)' })),
            //        state('done', style({  opacity: 0.5 ,transform: 'translateX(100%)', })),
            transition('void => in', [
                style({
                    opacity: 0,
                    transform: 'translateX(-100px)'
                }),
                animate('0.2s ease-in')
            ]),
            transition('* => void', [
                animate('0.2s  ease-out', style({
                    opacity: 0.5,
                    transform: 'translateX(100px)',
                }))
            ]),

        ])
    ]
})
export class message {

    list: Observable<any>;
    get messageStyle(){
        return {
            top: defaultTop+'px',
            
        }
    }

    constructor() {
        this.list = subject.asObservable();
    }
    static success(content: any, duration = defaultDuration, onClose?: any): Function {
        return log('success', content, duration*1000, onClose)
    }
    static error(content: any, duration = defaultDuration, onClose?: any): Function {
        return log('error', content, duration*1000, onClose)
    }
    static info(content: any, duration = defaultDuration, onClose?: any): Function {
        return log('info', content, duration*1000, onClose)
    }
    static warning(content: any, duration = defaultDuration, onClose?: any): Function {
        return log('warning', content, duration*1000, onClose)
    }
    static warn(content: any, duration = defaultDuration, onClose?: any): Function {
        return log('warning', content, duration*1000, onClose)
    }
    static loading(content: any, duration = defaultDuration, onClose?: any): Function {
        return log('loading', content, duration*1000, onClose)
    }
    static config(options: ConfigOptions) {
        if (options.top !== undefined) {
            defaultTop = options.top;
        }
        if (options.duration !== undefined) {
            defaultDuration = options.duration;
        }
    }
    static destroy() {
        list = [];
        subject.next(list)
    }
}

