

import { Component, ViewChild, TemplateRef, OnInit, ElementRef, Input } from '@angular/core';
import { toBoolean } from '../util/util'



@Component({
    selector: 'Spin',
    // template:` <acIcon type="loading"></acIcon>`,
    templateUrl: `./spin.html`,
    styles: [`
  
  `]
})
export default class SpinComponent implements OnInit {

    @Input() spin = false;

    get containerClass() {
        return {
            [`ant-spin-container`]:true,
            [`ant-spin-blur`]:toBoolean(this.spin)

        }
    }

    ngOnInit() {
       
    }
}
