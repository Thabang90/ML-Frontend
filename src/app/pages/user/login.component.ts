import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'app/shared/services/login.service';
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
import { delay, finalize } from 'rxjs';
import { ResetPasswordService } from 'app/shared/services/reset-password.service';

@Component({
    selector: 'login-cmp',
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit{

    loginForm: FormGroup;
    resetPasswordEmail: string;
    isValidEmail: boolean;

    @BlockUI() blockUI: NgBlockUI;
    constructor(
        private fb: FormBuilder,
        private loginService: LoginService,
        private toastr: ToastrService,
        private router: Router,
        private resetPasswordService: ResetPasswordService
        ){}

    ngOnInit(){
        this.loginForm = this.fb.group({
           email: ['', Validators.required],
           password: ['', Validators.required] 
        })
    }

    login() {
        this.blockUI.start('Logging In...')
        this.loginService.login(this.loginForm.value)
        .pipe(finalize(() => this.blockUI.stop()))
        .subscribe({
            next: (res) => {
                this.toastr.success(res.message);
                delay(3000);
                this.blockUI.stop();
                setTimeout(() => {
                    this.router.navigate(['/dashboard']);
                }, 2000);
            },
            error: (err) => {
                this.toastr.error(err.error.message);
            }
        })
    }

    verifyEmail(event: any) {
        const value = event;
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,4}$/;
        this.isValidEmail = emailPattern.test(value);
        return this.isValidEmail;
    }

    sendResetLink() {
        if(this.verifyEmail(this.resetPasswordEmail)) {
            this.blockUI.start('Sending Reset Password link...');
            this.resetPasswordService.sendResetPasswordLink(this.resetPasswordEmail)
            .subscribe({
                next: (res) => {
                    this.resetPasswordEmail = "";
                    this.toastr.success(res.message);
                    const buttonRef = document.getElementById('closeBtn');
                    this.blockUI.stop();
                    buttonRef?.click()
                },
                error: (err) => {
                    this.toastr.error(err.error.message);
                    this.blockUI.stop();
                }
            });
        }
    }
}
