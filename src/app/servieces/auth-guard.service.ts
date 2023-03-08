import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }
  // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

  // }
  canActivate(route: any, state: RouterStateSnapshot) {
    return this.authService.user$.pipe(
      map((user: any) => {
        if (user) return true;

        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
      })
    )
  }

}
