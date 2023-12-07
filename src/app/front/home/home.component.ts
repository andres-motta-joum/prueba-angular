import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import {heroBars3} from '@ng-icons/heroicons/outline';
import { heroXMark } from '@ng-icons/heroicons/outline';
import { AuthService } from 'src/app/back/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [provideIcons({heroBars3, heroXMark})]
})
export class HomeComponent implements OnInit{
  constructor(private router: Router, private auth: Auth, private authService: AuthService){}
  userName!: string;
  subMenu = false;

  ngOnInit(): void {
    this.auth.onAuthStateChanged((user)=>{
      if(user){
        this.userName = user.displayName!.split(' ').slice(0, 2).join(' ');
      }else{
        this.router.navigate(['sing-in']);
      }
    })
  }

  logout(){
    this.authService.signOut();
  }

  navegar(ruta: string){
    this.router.navigate([ruta]);
    this.subMenu = false;
  }
}
