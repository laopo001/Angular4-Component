import { Routes, RouterModule } from '@angular/router';

// import Page1Component from './pages/page1/page1.component'
// import Page2Component from './pages/page2/page2.component'
// import Page3Component from './pages/page3/page3.component'
import { TableDemoComponent } from './pages/table/demo.component'
import { CheckboxDemoComponent } from './pages/checkbox/demo.component'
import { InputDemoComponent } from './pages/input/demo.component'
import { SelectDemoComponent } from './pages/select/demo.component'
import { RadioDemoComponent } from './pages/radio/demo.component'
import { PopoverDemoComponent } from './pages/popover/demo.component'
import { PopconfirmDemoComponent } from './pages/popconfirm/demo.component'
import { TooltipDemoComponent } from './pages/tooltip/demo.component'
import { GridDemoComponent } from './pages/grid/demo.component'
import { PaginationDemoComponent } from './pages/pagination/demo.component'
import { SpinDemoComponent } from './pages/spin/demo.component'



export const ROUTES: Routes = [ {
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
}, {
    path: 'radio',
    component: RadioDemoComponent
}, {
    path: 'popover',
    component: PopoverDemoComponent
}, {
    path: 'popconfirm',
    component: PopconfirmDemoComponent
}, {
    path: 'tooltip',
    component: TooltipDemoComponent
}, {
    path: 'grid',
    component: GridDemoComponent
}, {
    path: 'pagination',
    component: PaginationDemoComponent
}, {
    path: 'spin',
    component: SpinDemoComponent
}];
