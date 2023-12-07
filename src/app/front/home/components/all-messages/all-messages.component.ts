import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Functions, HttpsCallableResult, connectFunctionsEmulator, httpsCallable } from '@angular/fire/functions';
import { Timestamp } from 'firebase-admin/firestore';
import { environment } from 'src/environments/environment';
import { heroChevronLeftMini } from '@ng-icons/heroicons/mini';
import { heroChevronRightMini } from '@ng-icons/heroicons/mini';
import { provideIcons } from '@ng-icons/core';
import {heroXMarkMini} from '@ng-icons/heroicons/mini';

interface Message {
  titulo: string, 
  descripcion: string, 
  fechaString: string, 
  fecha: Timestamp, 
  nombre: string
}

@Component({
  selector: 'app-all-messages',
  templateUrl: './all-messages.component.html',
  styleUrls: ['./all-messages.component.scss'],
  providers: [provideIcons({heroXMarkMini, heroChevronLeftMini, heroChevronRightMini})]
})
export class AllMessagesComponent {
  constructor(private functions: Functions, private auth: Auth){}
  myMessages!: Message[];
  results!: Message[][];
  cargando: boolean = true;
  dateInput = false;
  inputValue!:string;
  inSearch: boolean = false;
  words: string = '';

  index!: number;
  numbers!: number[]; 

  ngOnInit(): void {
    if (environment.production === false) {
      connectFunctionsEmulator(this.functions, "localhost",  5001);
    }  
    this.auth.onAuthStateChanged((user)=>{
      if(user){
        this.findMessages()
      }
    })
  }

  async findMessages(){
    const findMyMessages = httpsCallable(this.functions, 'findAllPots');
    this.myMessages = (await findMyMessages({ date: false, userId: this.auth.currentUser!.uid})).data as Message[];
    this.index = 1;
    this.results = [];
    for (let i = 0; i < this.myMessages.length; i += 2) {
      this.results.push(this.myMessages.slice(i, i + 2));
    }
    this.getNumbers();
    this.cargando = false;
  }

  nuevoIndex(index: number){
    if(index !== 0 && index <= this.results.length){
      this.index = index;
      this.getNumbers();
    }
  }

  getNumbers() {
    let numbers = [];

    if (this.index === this.results.length && this.results.length >= 3) {
      numbers = [this.index - 2, this.index - 1, this.index];
    } else if (this.index === this.results.length && this.results.length >= 2) {
      numbers = [this.index - 1, this.index];
    }
    
    else if (this.index === this.results.length - 1 && this.results.length >= 3) {
      numbers = [this.index - 1, this.index, this.index + 1];
    } else if (this.index === this.results.length - 1) {
      numbers = [this.index, this.index + 1];
    } 

    else if (this.index === this.results.length - 2 && this.results.length >= 3) {
      numbers = [this.index, this.index + 1, this.index + 2];
    } 
  
    else {
      numbers = [this.index];
    }

    this.numbers = numbers;
  }

  onKeydown(event: any) {
    if (event.keyCode === 13) {
      event.preventDefault();
      event.target.blur();
    }
  }

  onFocus() {
    this.dateInput = true;
    this.inSearch = false;
    this.checkInput();
  }

  onBlur() {
    this.dateInput = false;
    this.checkInput();
  }
  
  async checkInput() {
    if (this.inputValue || this.words) {
      this.cargando = true;
      this.myMessages = [];
      if(this.inputValue){
        this.inSearch = true;
      }
      const findMyMessages = httpsCallable(this.functions, 'findAllPots');
      this.myMessages = (await findMyMessages({ date: this.inputValue ? new Date(this.inputValue) : false, words: this.words, userId: this.auth.currentUser!.uid})).data as Message[];
      this.index = 1;
      this.results = [];
      for (let i = 0; i < this.myMessages.length; i += 2) {
        this.results.push(this.myMessages.slice(i, i + 2));
      }
      this.getNumbers();
      this.cargando = false;
      this.cargando = false;
    }else{
      this.inSearch = false;
    }
  }

  deleteSearch(){
    this.inSearch = false;
    this.inputValue = "";
    this.findMessages();
  }
}
