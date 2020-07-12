import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NbThemeModule } from '@nebular/theme';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { NebularUIModule } from './modules/nebular-ui.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
    AppRoutingModule,
    NbThemeModule.forRoot({ name: 'cosmic' }),
    NebularUIModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
