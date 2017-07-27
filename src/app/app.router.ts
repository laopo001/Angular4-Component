import {Routes,RouterModule} from '@angular/router';

import Page1Component from './pages/page1/page1.component'
import Page2Component from './pages/page2/page2.component'
import Page3Component from './pages/page3/page3.component'
import { TableDemoComponent } from './pages/table/demo.component'
import { CheckboxDemoComponent } from './pages/checkbox/demo.component'
import { InputDemoComponent } from './pages/input/demo.component'
import { SelectDemoComponent } from './pages/select/demo.component'


export const ROUTES: Routes = [{
    path: 'page1',
    component: Page1Component
}, {
    path: 'page2',
    component: Page2Component
}, {
    path: 'page3',
    component: Page3Component
}, {
    path: 'table',
    component: TableDemoComponent
}, {
    path: 'checkbox',
    component: CheckboxDemoComponent
}, {
    path: 'input',
    component: InputDemoComponent
}, {
    path: 'select',
    component: SelectDemoComponent
}];
