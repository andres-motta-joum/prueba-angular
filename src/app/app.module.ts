import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgIconsModule } from '@ng-icons/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateMessageComponent } from './front/home/components/create-message/create-message.component';
import { HomeComponent } from './front/home/home.component';
import { SingInComponent } from './front/sing-in/sing-in.component';
import { SingUpComponent } from './front/sing-up/sing-up.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth,getAuth} from '@angular/fire/auth';
import { provideFirestore, getFirestore} from '@angular/fire/firestore';
import { provideFunctions, getFunctions } from '@angular/fire/functions';
import { environment } from 'src/environments/environment';
import { ErrorMessageComponent } from './front/sing-up/validators/error-message.component';
import { AllMessagesComponent } from './front/home/components/all-messages/all-messages.component';
import { MyPublicationsComponent } from './front/home/components/my-publications/my-publications.component';
import { PublicationComponentComponent } from './front/home/components/publication-component/publication-component.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateMessageComponent,
    HomeComponent,
    SingInComponent, 
    SingUpComponent,
    ErrorMessageComponent,
    AllMessagesComponent,
    MyPublicationsComponent,
    PublicationComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgIconsModule.withIcons({}),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideFunctions(() => getFunctions()),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
