import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ConfirmPasswordValidator } from "app/shared/helpers/confirm-password.validator";
import { ResetPasswordService } from "app/shared/services/reset-password.service";
import { BlockUI, NgBlockUI } from "ng-block-ui";
import { ToastrService } from "ngx-toastr";
import { finalize } from "rxjs";

@Component({
    selector: 'reset-cmp',
    templateUrl: 'reset-password.component.html'
})

export class ResetPasswordComponent implements OnInit {

    @BlockUI() blockUI: NgBlockUI;
    resetPasswordForm: FormGroup;
    emailToReset: string;
    constructor(
        private fb: FormBuilder,
        private activatedRoute: ActivatedRoute,
        private resetPasswordService: ResetPasswordService,
        private toastr: ToastrService,
        private router: Router
    ){}

    ngOnInit(){
        this.resetPasswordForm = this.fb.group({
            password: ['',Validators.required],
            confirmPassword: ['',Validators.required]
        },
            {validator: ConfirmPasswordValidator("password", "confirmPassword")
        })

        this.activatedRoute.queryParams.subscribe(val => {
            this.emailToReset = val['email'];
        })
    }

    resetPassword() {
        var restPassword = {
            email: this.emailToReset,
            password: this.resetPasswordForm.value.password
        };
        this.blockUI.start('Resetting Password...');
        this.resetPasswordService.resetPassword(restPassword)
        .pipe(finalize(() => this.blockUI.stop()))
        .subscribe({
            next:(res) => {
                this.resetPasswordForm.reset();
                this.toastr.success(res.message);
                this.router.navigate(['/login']);
            },
            error:(err) => {
                this.toastr.error(err.message);
            }
        })
    }
}