import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private userService: UserService) { }
  canActivate(): Observable<boolean> {
    return this.authService.appUser$.pipe(
      map((appUser: any) => appUser.isAdmin)
    )
    // return this.authService.user$.pipe(
    //   switchMap(async (user) => {
    //     if (user) this.userService.get(user.uid)
    //   }),
    //   map((appUser: any) => appUser.isAdmin)
    // )
  }
}
