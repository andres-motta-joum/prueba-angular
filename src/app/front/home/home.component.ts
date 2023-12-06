import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import {heroBars3} from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [provideIcons({heroBars3})]
})
export class HomeComponent implements OnInit{
  constructor(private router: Router, private auth: Auth){}

  ngOnInit(): void {
    this.auth.onAuthStateChanged((user)=>{
      if(user){

      }else{
        this.router.navigate(['sing-in']);
      }
    })
  }
}
