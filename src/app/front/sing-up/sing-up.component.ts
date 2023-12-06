import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/back/auth/auth.service';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.scss']
})
export class SingUpComponent {
  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService, private auth: Auth) {}
  private readonly emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  private readonly fullNamePattern = /^[A-Za-záéíóúÁÉÍÓÚñÑ\s]{1,30}$/;
  form!: FormGroup;
  user$!: Observable<any>;
  passwordCheck!: boolean | null;
  inputFunction = false;
  checkbox = true;
  checkedbox = false;
  correoExistente = '';
  cargando = false;

  ngOnInit(): void {
    this.initForm();
    //this.authService.signOut();
    this.user$ = this.authService.userState$;
  }

  private initForm():void {
    this.form = this.fb.group(
      {
        name: ['', [Validators.required, Validators.maxLength(30), Validators.pattern(this.fullNamePattern)] ],
        email: ['', [Validators.required, Validators.pattern(this.emailPattern)] ],
        password: ['', [Validators.required, Validators.minLength(6),Validators.maxLength(30)]],
        passwordVerify: ['', [Validators.required]]
      });
  }

  correoNuevo(){
    this.correoExistente = '';
  }
  
  passwordVerifyValidator(group: FormGroup){
    const password = group.get('password')?.value;
    const passwordVerify = group.get('passwordVerify')?.value;
    this.passwordCheck = password === passwordVerify ? true : false;
  }
  hasError(field: string ): boolean{
    const fieldName = this.form.get(field);
    return !! fieldName?.invalid && fieldName.touched;
  }

  //----------------------------------------------------------

  async onSubmit(): Promise<void> {
    Object.keys(this.form.controls).forEach(key => {
      this.form.get(key)?.markAsTouched();
    });
  
    if (this.form.valid) {
      this.passwordVerifyValidator(this.form);
      if(this.passwordCheck){
        this.cargando = true;
        const { email, password, name } = this.form.value;
        await this.authService.getCorreoExistente(email).then(async (existe)=>{
          if(!existe){
            await this.authService.singUp(name, email, password); //FUNCION DEL BACK
            this.router.navigate(['']);
          }else{
            this.cargando = false;
            this.correoExistente = 'This email is already associated with an existing account.';
          }
        })
      }else{
        this.inputFunction = true;
      }
    }
  }
  
  handleCheckBoxChange() { // CheckBox
    const isChecked = this.form.get('checkbox')!.value;
    this.checkbox = isChecked;
    this.checkedbox = isChecked;
  }

  navegar(ruta: string){
    this.router.navigate([ruta]);
  }

}
