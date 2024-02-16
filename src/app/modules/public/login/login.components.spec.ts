import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { LoginComponent } from "./login.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AuthService } from "src/app/services/auth.service";
import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "src/app/app-routing.module";

describe('Login Component Test Suite', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LoginComponent],
            providers: [AuthService, FormBuilder],
            imports: [
                ReactiveFormsModule,
                HttpClientModule,
                BrowserModule,
                AppRoutingModule
            ]
        }).compileComponents();
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;        
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should create a form with two controls', () => {
        expect(component.userForm.contains('username')).toBeTruthy();
        expect(component.userForm.contains('password')).toBeTruthy();
    });

    it('should make the username control required', () => {
        let control = component.userForm.get('username');
        control?.setValue('mohan@gmail.com');
        expect(control?.valid).toBeTruthy();
    });
});