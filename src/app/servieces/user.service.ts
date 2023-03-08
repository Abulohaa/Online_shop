import { User } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/compat/database';
import { AppUser } from 'app/models/app-user';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFireDatabase) { }

  save(user: firebase.User) {
    if (!user)
      return;
    const { displayName, email } = user;
    this.db.object('/users/' + user.uid).update({
      name: displayName,
      email: email,
    })
  }

  get(uid: string): AngularFireObject<AppUser> {
    return this.db.object('/users/' + uid);
  }
}
