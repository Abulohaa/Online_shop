import { UserService } from './servieces/user.service';
import { Router } from '@angular/router';
import { AuthService } from './servieces/auth.service';
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) {
    authService.user$.subscribe(user => {
      if (!user) return;
      userService.save(user);

      let returnUrl = localStorage.getItem('returnUrl');
      if (!returnUrl) return;

      localStorage.removeItem('returnUrl')
      router.navigateByUrl(returnUrl!)
    })
  }
}
