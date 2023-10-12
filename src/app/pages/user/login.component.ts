import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'app/shared/services/login.service';
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';

@Component({
    selector: 'login-cmp',
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit{

    loginForm: FormGroup;
    @BlockUI() blockUI: NgBlockUI;
    constructor(
        private fb: FormBuilder,
        private loginService: LoginService,
        private toastr: ToastrService,
        private router: Router
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
                this.router.navigate(['/dashboard']);
            },
            error: (err) => {
                this.toastr.error(err.message);
            }
        })
    }
}
