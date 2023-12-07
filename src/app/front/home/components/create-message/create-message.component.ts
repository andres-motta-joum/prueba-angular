import { Component, HostListener, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Functions, connectFunctionsEmulator, httpsCallable } from '@angular/fire/functions';
import { Timestamp } from 'firebase-admin/firestore';
import { Observable, interval } from 'rxjs';
import { first, map, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create-message',
  templateUrl: './create-message.component.html',
  styleUrls: ['./create-message.component.scss']
})
export class CreateMessageComponent implements OnInit{
  constructor(private auth: Auth, private functions: Functions){}
  description!: string | null | undefined;
  cargando = false;
  title!: string;
  name!: string;
  date$!: Observable<string>;
  alert!: string | undefined;

  ngOnInit(): void {
    if (environment.production === false) {
      connectFunctionsEmulator(this.functions, "localhost",  5001);
    }  
    this.auth.onAuthStateChanged((user)=>{
      if(user){
        this.name = user.displayName!.split(' ').slice(0, 2).join(' ');
      }
    })
    this.date$ = interval(1000).pipe(
      map(() => {
        let now = new Date();
        let hours = now.getHours();
        let minutes: string | number = now.getMinutes();
        let ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // las 0 vendrían siendo las 12
        minutes = minutes < 10 ? '0'+minutes : minutes;
        let strTime = hours + ':' + minutes + ' ' + ampm;
        let date = ("0" + now.getDate()).slice(-2);
        let month = ("0" + (now.getMonth() + 1)).slice(-2);
        let year = now.getFullYear().toString().substr(-2);
        return strTime + ' ' + date + '/' + month + '/' + year;
      })
    );
  }

  async submit(textoDescripcion: HTMLElement){
    if(this.title && this.description && this.title !== '' && this.description !== ''){
      this.cargando = true;
      const subscription = this.date$.pipe(first()).subscribe(async (dateString) => {
        const createMessages = httpsCallable(this.functions, 'createMessage');
        const createMessageResponse = await createMessages({ title: this.title, description: this.description, dateString: dateString, name: this.name, userId: this.auth.currentUser!.uid });
        if(createMessageResponse.data){
          this.alert = 'success'
        }else{
          this.alert = 'error'
        }
        this.cargando = false;
        this.restaurarDatos(textoDescripcion);
      });
    }else{
      this.alert = 'error';
    }
  }

  restaurarDatos(textoDescripcion: HTMLElement){
    this.title = '';
    this.description = '';

    let nodos = textoDescripcion.childNodes;
    for(let i = nodos.length - 1; i >= 0; i--) {
      if(nodos[i].nodeType === Node.TEXT_NODE) {
        textoDescripcion.removeChild(nodos[i]);
      } else if(nodos[i].nodeType === Node.ELEMENT_NODE && nodos[i].nodeName === 'DIV') {
        let elemento = <Element>nodos[i];
        if(!elemento.hasAttribute('class') && !elemento.hasAttribute('id')) {
          textoDescripcion.removeChild(nodos[i]);
        }
      }
    }
  }

  onPaste(event: ClipboardEvent) {
    event.preventDefault();
    navigator.clipboard.readText().then((text) => {
      document.execCommand('insertText', false, text);
    });
  }
  
  onInputChange(event: any) {
    if(event.target.innerText !== ''){
      this.description = event.target.innerText;
    }else{
      this.description = null;
    }
  }

  focus(){
    if(this.description == null){
      this.description = '';
    }
  }

  @HostListener('document:click')
  closeAlert() {
    if(this.alert){
      this.alert = undefined
    }
  }
}
