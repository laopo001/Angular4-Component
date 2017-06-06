import { Component, Input, OnInit, } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,keyframes
} from '@angular/animations';
import * as Rx from 'rxjs';
import { Observable, Subject } from 'rxjs';


let list:any = []

var subject = new Rx.BehaviorSubject(list);

let id = 0;

function log(type:string, content:string, duration = 1500, onClose?:any) {
    id++;
    let obj = {
        type: type,
        content,
        id,
        onClose,
        state:'in'
    }
    list = [...list, obj]

    function close() {
        list = list.filter((x:any) => {
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

@Component({
    selector: 'Message',
    template: `<div data-reactroot="" class="ant-message">
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
export  class Message {

    list: Observable<any>;

    state: Observable<any>;
    constructor() {
  
        this.list = subject.asObservable();
    }

}

export class message{
    static success(content:any, duration = 1500, onClose?:any) {
        return log('success', content, duration, onClose)
    }
    static error(content:any, duration = 1500, onClose?:any) {
        return log('error', content, duration, onClose)
    }
    static info(content:any, duration = 1500, onClose?:any) {
        return log('info', content, duration, onClose)
    }
    static warning(content:any, duration = 1500, onClose?:any) {
        return log('warning', content, duration, onClose)
    }
    static warn(content:any, duration = 1500, onClose?:any) {
        return log('warning', content, duration, onClose)
    }
    static loading(content:any, duration = 1500, onClose?:any) {
        return log('loading', content, duration, onClose)
    }
}