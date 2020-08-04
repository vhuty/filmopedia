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
  NbProgressBarModule,
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
  NbProgressBarModule,
];

@NgModule({
  imports: [...modules],
  exports: [...modules],
})
export class NebularUIModule {}
