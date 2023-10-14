import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DashboardService } from 'app/shared/services/dashboard.service';
import { LoginService } from 'app/shared/services/login.service';
import Chart from 'chart.js';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';


@Component({
    selector: 'dashboard-cmp',
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit{

  @BlockUI() blockUI: NgBlockUI;
  userForm: FormGroup;
  users: any;
  userCount: number;
  isValidEmail: boolean;
  subject: string;
  question: string;
  constructor(
    private fb: FormBuilder,
    private dashboardService: DashboardService,
    private toastr: ToastrService,
    private loginService: LoginService
    ) {}

    ngOnInit(){
      this.getUsers();

      this.userForm = this.fb.group({
        username: ['', Validators.required],
        email: ['', Validators.required],
        isAdmin: [false]
      })
    }

    getUsers() {
      this.dashboardService.getUsers().subscribe({
        next: (users) => {
          this.users = users;
          this.userCount = users.length;
        },
        error: (err) => {
          this.toastr.error(err.message);
        }
      })
    }

    verifyEmail(event: any) {
      const value = event;
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,4}$/;
      this.isValidEmail = emailPattern.test(value);
      return this.isValidEmail;
    }

    addUser() {
      this.blockUI.start('Adding user...');
      this.loginService.addUser(this.userForm.value)
      .pipe(finalize(() => this.blockUI.stop()))
      .subscribe({
        next: (res) => {
          this.userForm.reset();
          var buttonRef = document.getElementById('closeBtn');
          buttonRef.click();
          this.toastr.success(res.message);
          this.getUsers();
        },
        error: (err) => {
          this.toastr.error(err.message);
        }
      })
    }

    addQuestion(){
      
    }
}
