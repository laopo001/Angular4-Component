import { Component, OnInit } from '@angular/core';



@Component({
	selector: 'popover-demo',
	templateUrl: './demo.component.html',
	styleUrls: ['./demo.component.css'],

})
export class PopoverDemoComponent {
	opened = false
	openedChange(e) { console.log(e) }
	data = [
		{
			param: 'title',
			description: '标题',
			type: `string||TemplateRef<any>`,
			dValue: '无'
		}, {
			param: 'content',
			description: '内容(必须)',
			type: `string||TemplateRef<any>`,
			dValue: '无'
		}, {
			param: 'trigger',
			description: '触发方式',
			type: `'click' | 'hover' | 'focus'`,
			dValue: `'click'`
		}, {
			param: 'placement',
			description: '弹出位置',
			type: `'top' | 'right' | 'bottom' | 'left' |
    'bottomRight' | 'topRight' | 'bottomLeft' | 'topLeft' |
    'rightBottom' | 'leftBottom' | 'rightTop' | 'leftTop';`,
			dValue: `'bottom'`
		},
	]

}