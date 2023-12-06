import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './front/home/home.component';
import { SingInComponent } from './front/sing-in/sing-in.component';
import { SingUpComponent } from './front/sing-up/sing-up.component';
import { CreateMessageComponent } from './front/create-message/create-message.component';

const routes: Routes = [
  {
    path:'',
    component: HomeComponent
  },
  {
    path:'sing-in',
    component: SingInComponent
  },
  {
    path:'sing-up',
    component: SingUpComponent
  },
  {
    path:'create-message',
    component: CreateMessageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
