import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styles: [
  ]
})
export class SignupComponent implements OnInit {
  signUpForm!: FormGroup;
  returnUrl: string = '';
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private route: ActivatedRoute) {
    
  }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      name: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required,Validators.pattern('^[0-9]+$'),Validators.maxLength(10)]],
      role: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    })
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
  }

  signUpUser() {
    console.log(this.signUpForm.valid)
    if (this.signUpForm.valid) {
      console.log(this.signUpForm.valid)
      //console.log(this.signUpForm.value);
    //   this.authService.CreateUser(this.signUpForm.value).subscribe((response) => {
    //     //console.log(response);
    //     if (response.status == 200 && response.body != null) {
    //       const user: User = response.body;
    //       this.authService.SetAuthUser(user);

    //       if (this.returnUrl != '') {
    //         this.router.navigate([this.returnUrl]);
    //       }
    //       else if (user.roles.find(role => role == 'Admin') == 'Admin') {
    //         this.router.navigate(['/admin']);
    //       }
    //       else if (user.roles.find(role => role == 'User') == 'User') {
    //         this.router.navigate(['/user']);
    //       }
    //       else {
    //         console.log('Username or password is incorrect!')
    //       }
    //     }
    //   }, (error) => {
    //     console.log(error);
    //   })
    }
  } 

}
