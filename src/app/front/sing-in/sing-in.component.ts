import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/back/auth/auth.service';

@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.component.html',
  styleUrls: ['./sing-in.component.scss']
})
export class SingInComponent {
  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService, private auth: Auth) {}
  public form!: FormGroup;
  public user$!: Observable<any>;
  private readonly emailpattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  public notFound = false;
  public requiredEmail = false;

  ngOnInit(): void {
    this.initForm();
    this.user$ = this.authService.userState$;
  }

  private initForm():void {
    this.form = this.fb.group(
      {
        email: ['', [Validators.required]],
        password: ['', [Validators.required]]
      }
    )
  }
  
  async onSubmit(): Promise<void>{
    const {email,password} = this.form.value;
    const errorMessage = await this.authService.singIn(email, password);
    if (errorMessage) {
      if(errorMessage === 'notFound'){
        this.notFound = true;
        this.requiredEmail = false;
      }
      else if(errorMessage === 'emailRequier'){
        this.notFound = false;
        this.requiredEmail = true;
      }
    }else{
      this.notFound = false; this.requiredEmail = false;
      this.router.navigate(['']);
    }
  }

  navegar(ruta: string){
    this.router.navigate([ruta]);
  }
}
