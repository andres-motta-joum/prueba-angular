import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './front/home/home.component';
import { SingInComponent } from './front/sing-in/sing-in.component';
import { SingUpComponent } from './front/sing-up/sing-up.component';
import { CreateMessageComponent } from './front/home/components/create-message/create-message.component';
import { AllMessagesComponent } from './front/home/components/all-messages/all-messages.component';
import { MyPublicationsComponent } from './front/home/components/my-publications/my-publications.component';

const routes: Routes = [
  {
    path:'',
    component: HomeComponent,
    children: [
      {
        path: '',
        redirectTo: 'all-posts',
        pathMatch: 'full'
      },
      {
        path:'all-posts',
        component: AllMessagesComponent
      },
      {
        path:'my-posts',
        component: MyPublicationsComponent
      },
      {
        path:'create-post',
        component: CreateMessageComponent
      }
    ]
  },
  {
    path:'sing-in',
    component: SingInComponent
  },
  {
    path:'sing-up',
    component: SingUpComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
