import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'app/shared/services/user.service';
import { LoginService } from 'app/shared/services/login.service';
import Chart from 'chart.js';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { QuestionsService } from 'app/shared/services/questions.service';


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
  questions: any;
  questionCount: number;
  subject: string;
  question: string;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService,
    private questionService: QuestionsService
    ) {}

    ngOnInit(){
      this.getUsers();
      this.getQuestions();

      this.userForm = this.fb.group({
        username: ['', Validators.required],
        email: ['', Validators.required],
        isAdmin: [false]
      })
    }

    getUsers() {
      this.userService.getUsers().subscribe({
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
      this.userService.upsertUser(this.userForm.value)
      .pipe(finalize(() => this.blockUI.stop()))
      .subscribe({
        next: (res) => {
          this.userForm.reset();
          var buttonRef = document.getElementById('closeBtn');
          buttonRef.click();
          this.toastr.success('User has been added successfully');
          this.getUsers();
        },
        error: (err) => {
          this.toastr.error(err.message);
        }
      })
    }

    getQuestions() {
      this.questionService.getQuestions().subscribe({
        next: (res) => {
          this.questions = res;
          this.questionCount = res.length;
        },
        error: (err) => {
          this.toastr.error(err.message);
        }
      })
    }

    addQuestion() {
      var questionModel = {
        question: this.question,
        subject: this.subject
      };
      this.blockUI.start('Adding question...');
      this.questionService.addQuestion(questionModel)
      .pipe(finalize(() => this.blockUI.stop()))
      .subscribe({
        next: (res) => {
          var buttonRef = document.getElementById('closeBtn');
          buttonRef.click();
          this.toastr.success(res.message);
          
        },
        error: (err) => {
          this.toastr.error(err.message)
        }
      })
    }

}
