import { Auth, createUserWithEmailAndPassword, updateProfile } from '@angular/fire/auth';
import { UserService } from './user.service';
import { AppUser } from './../models/app-user';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Injectable } from '@angular/core';
import { GoogleAuthProvider, signInWithEmailAndPassword } from 'firebase/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap, of, from } from 'rxjs';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // user$: Observable<any>;
  user$: Observable<firebase.User>

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private auth: Auth,
  ) {
    this.user$ = afAuth.authState;
  }

  googleAuth() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/'
    localStorage.setItem('returnUrl', returnUrl);

    return this.authLogin(new GoogleAuthProvider())
    // .then((res: any) => {
    //   this.router.navigate(['']);
    // });

  }

  authLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        console.log('You have been successfully logged in!');
      })
      .catch((error) => {
        console.log(error);
      });

  }

  logout() {
    this.afAuth.signOut()
      .catch(error => {
        console.error('Error during sign out', error);
      });
    this.router.navigate([''])
  }

  // get appUser$(): Observable<AngularFireObject<AppUser> | Observable<null>> {
  get appUser$(): Observable<AppUser | null> {
    return this.user$.pipe(
      switchMap((user) => {
        // debugger;
        if (user) return this.userService.get(user.uid).valueChanges();

        return of(null);
      })
    )
  }

  loginWithPassword(userName: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, userName, password))
  }

  signUp(userName: string, email: string, password: string) {
    return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe(
      switchMap(({ user }) => updateProfile(user, { displayName: userName }))
    );
  }
}
