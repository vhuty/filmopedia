import { NgModule } from '@angular/core';

import {
  NbLayoutModule,
  NbSearchModule,
  NbCardModule,
  NbButtonModule,
  NbIconModule,
} from '@nebular/theme';

const modules = [
  NbLayoutModule,
  NbSearchModule,
  NbButtonModule,
  NbCardModule,
  NbIconModule,
];

@NgModule({
  imports: [...modules],
  exports: [...modules],
})
export class NebularUIModule {}
