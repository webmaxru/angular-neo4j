import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { AngularNeo4jModule } from '../lib';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AngularNeo4jModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
