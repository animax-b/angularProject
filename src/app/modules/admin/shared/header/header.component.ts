import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {
  user:User | undefined;
  constructor(private router: Router, private authService:AuthService) { 
    this.user = this.authService.user;
  }

  ngOnInit(): void {
  }
  LogOut() {
    this.authService.RemoveUser();
    this.router.navigate(['/login']);
  }
}
