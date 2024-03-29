import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { CommonModule } from '@angular/common';
import { AgmCoreModule} from '@agm/core';

import {HttpClientModule, HttpClientJsonpModule} from '@angular/common/http';
import { ParkdisplayComponent } from './parkdisplay/parkdisplay.component';


@NgModule({
  declarations: [
    AppComponent,
    ParkdisplayComponent

  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    HttpClientJsonpModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


    // ,    AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyCsS7Mt9eKvM5KyeeH3ykIFr6nIzAaP9SM'
    // })