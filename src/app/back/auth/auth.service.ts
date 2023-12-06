import { Injectable } from '@angular/core';
import { Auth, EmailAuthProvider, User, authState, createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, updateProfile } from '@angular/fire/auth';
import { Firestore, collection, doc, getDocs, query, setDoc, where } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private auth: Auth, private router: Router, private firestore: Firestore) {}

  get userState$(){
    return authState(this.auth);
  }

  async getCorreoExistente(correo: string){
    const queri = query(collection(this.firestore, 'usuarios'), where('correo', '==', correo));
    const querySnapshot = await getDocs(queri);
    const doc = querySnapshot.docs[0];
    if(doc){
      return true
    }else{
      return false
    }
  }

  async singUp(name:string , email:string, password: string){
    try {
      const singCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      await updateProfile(singCredential.user, {
        displayName: name
      });
      await sendEmailVerification(singCredential.user);
      const usuarioRef = doc(this.firestore, "usuarios", singCredential.user.uid);
      await setDoc(usuarioRef, {nombre: name, correo: email}); 
    } catch (error) {
      console.error(error);
    }
  }

  async singIn(email:string, password:string):Promise<string | void>{
    try {
      await signInWithEmailAndPassword(this.auth, email, password);
      // SingIN
      // verificar si verificó el Email
      // redireccionar
    } catch (error:unknown) {
      const {code, message} = error as any;
      console.log('code', code);
      console.log('message', message)
      if(code === 'auth/user-not-found' || code === 'auth/invalid-credential' || code === 'auth/wrong-password' || code === 'auth/missing-password'){
        return 'notFound'
      } else if(code === 'auth/invalid-email'){
        return 'emailRequier'
      }
    }
  }


//------------------------------------------------------------------------------------------------------------------------------------------------------


  async signOut(): Promise<void>{
    try{
      this.auth.signOut();
    }catch(error: unknown){
      console.log(error)
    }
  }
  async sendEmail(user:User): Promise<void>{
    try {
      await sendEmailVerification(user);
    } catch (error:unknown) {
      console.log(error)
    }
  }
}
