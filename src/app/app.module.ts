import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateMessageComponent } from './front/create-message/create-message.component';
import { HomeComponent } from './front/home/home.component';
import { SingInComponent } from './front/sing-in/sing-in.component';
import { SingUpComponent } from './front/sing-up/sing-up.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateMessageComponent,
    HomeComponent,
    SingInComponent,
    SingUpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
