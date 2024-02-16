import { Injectable } from '@angular/core';
import { CanMatch, Router } from '@angular/router';

import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanMatch {
  constructor(private authSevice: AuthService, private router: Router) { }
  canMatch(): boolean {
    //Authenticity check
    if (this.authSevice.user != undefined) {
      //Authorization check
      if (this.authSevice.user.roles.find(role => role == 'Admin') == 'Admin') {
        return true;
      }
      else {
        this.router.navigate(['/unauthorize']);
        return true;
      }
    }
    this.router.navigate(['/login']);
    return false;
  }
}
