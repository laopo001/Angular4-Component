import { NgModule } from '@angular/core';
import Select from './acSelect.component';
import Option from './option.component';
export {Select,Option};


@NgModule({
  declarations: [Select,Option],
  exports: [Select,Option],
  imports: [],
})
export default class acSelectModule {

}