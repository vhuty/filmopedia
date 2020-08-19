import { NgModule } from '@angular/core';

import {
  NbLayoutModule,
  NbCardModule,
  NbButtonModule,
  NbIconModule,
  NbTooltipModule,
  NbSpinnerModule,
  NbBadgeModule,
  NbProgressBarModule,
  NbActionsModule,
  NbPopoverModule,
} from '@nebular/theme';

const modules = [
  NbLayoutModule,
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbTooltipModule,
  NbSpinnerModule,
  NbBadgeModule,
  NbProgressBarModule,
  NbActionsModule,
  NbPopoverModule,
];

@NgModule({
  imports: [...modules],
  exports: [...modules],
})
export class NebularUIModule {}
