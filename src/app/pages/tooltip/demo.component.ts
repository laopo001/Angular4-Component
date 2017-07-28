import { Component, OnInit } from '@angular/core';
import { message } from '../../ac/message/'


@Component({
	selector: 'tooltip-demo',
	templateUrl: './demo.component.html',
	styleUrls: ['./demo.component.css'],

})
export class TooltipDemoComponent {
	opened = false
	openedChange(e) { console.log(e) }
	onConfirm(e) {
		if (e) { message.success('点击确定') } else {
			message.warning('点击取消')
		}
	}
	data = [
		{
			param: 'title',
			description: '提示文字',
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