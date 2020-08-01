import { NgModule } from '@angular/core';

import {
  NbLayoutModule,
  NbSearchModule,
  NbCardModule,
  NbButtonModule,
  NbIconModule,
  NbTooltipModule,
  NbSpinnerModule,
  NbBadgeModule,
} from '@nebular/theme';

const modules = [
  NbLayoutModule,
  NbSearchModule,
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbTooltipModule,
  NbSpinnerModule,
  NbBadgeModule,
];

@NgModule({
  imports: [...modules],
  exports: [...modules],
})
export class NebularUIModule {}
