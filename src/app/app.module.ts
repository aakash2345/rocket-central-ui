import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PaymentComponentModule } from './features/payment/payment.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    PaymentComponentModule
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
