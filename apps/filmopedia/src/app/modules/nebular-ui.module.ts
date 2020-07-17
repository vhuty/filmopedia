import { NgModule } from '@angular/core';

import {
  NbLayoutModule,
  NbSearchModule,
  NbCardModule,
  NbButtonModule,
  NbIconModule,
  NbTooltipModule,
} from '@nebular/theme';

const modules = [
  NbLayoutModule,
  NbSearchModule,
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbTooltipModule,
];

@NgModule({
  imports: [...modules],
  exports: [...modules],
})
export class NebularUIModule {}
