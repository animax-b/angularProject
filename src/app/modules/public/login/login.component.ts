import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {
  userForm: FormGroup;
  returnUrl: string = '';
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private route: ActivatedRoute) {
    this.userForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
  }
  LoginUser() {
    if (this.userForm.valid) {
      //console.log(this.userForm.value);
      this.authService.ValidateUser(this.userForm.value).subscribe((response) => {
        //console.log(response);
        if (response.status == 200 && response.body != null) {
          const user: User = response.body;
          this.authService.SetAuthUser(user);

          if (this.returnUrl != '') {
            this.router.navigate([this.returnUrl]);
          }
          else if (user.roles.find(role => role == 'Admin') == 'Admin') {
            this.router.navigate(['/admin']);
          }
          else if (user.roles.find(role => role == 'User') == 'User') {
            this.router.navigate(['/user']);
          }
          else {
            console.log('Username or password is incorrect!')
          }
        }
      }, (error) => {
        console.log(error);
      })
    }
  }
}
