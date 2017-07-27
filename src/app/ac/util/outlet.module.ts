import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ngOut} from './outlet';

@NgModule({
  imports: [CommonModule],
  declarations: [ngOut],
  exports: [ngOut],
})
export class ngOutModule {}