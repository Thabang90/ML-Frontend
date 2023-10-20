import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from "app/shared/services/user.service";
import { LoginService } from "app/shared/services/login.service";
import Chart from "chart.js";
import { BlockUI, NgBlockUI } from "ng-block-ui";
import { ToastrService } from "ngx-toastr";
import { finalize } from "rxjs";
import { QuestionsService } from "app/shared/services/questions.service";

@Component({
  selector: "dashboard-cmp",
  templateUrl: "dashboard.component.html",
})
export class DashboardComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  userForm: FormGroup;
  questionsForm: FormGroup;
  modeSrc:FormGroup;
  users = [
    { username: "user1", email: "user1@example.com" },
    { username: "user2", email: "user2@example.com" },
    { username: "user3", email: "user3@example.com" },
    { username: "user4", email: "user4@example.com" },
    { username: "user5", email: "user5@example.com" },
  ];
  userCount: number;
  isValidEmail: boolean;
  questions = [
    { promptQuestion: "What does CPU stand for?", subject: "IT Fundamentals" },
    {
      promptQuestion: "What is a firewall used for in network security?",
      subject: "Network Security",
    },
    {
      promptQuestion:
        "What programming language is commonly used for web development?",
      subject: "Web Development",
    },
    {
      promptQuestion: "What is the purpose of DNS in networking?",
      subject: "Networking",
    },
    {
      promptQuestion: "What does HTML stand for in web development?",
      subject: "Web Development",
    },
  ];
  questionCount: number;
  found: boolean;
  searchCliked: boolean;
  //subject: string;
  //question: string;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService,
    private questionService: QuestionsService
  ) {}

  ngOnInit() {
    /* this.getUsers();
      this.getQuestions(); */

    this.userForm = this.fb.group({
      username: ["", Validators.required],
      email: ["", Validators.required],
      isAdmin: [false],
    });

    this.questionsForm = this.fb.group({
      question: ["", Validators.required],
      subject: ["", Validators.required],
    });

    this.modeSrc = this.fb.group({
      src: ["", Validators.required]
    });
  }

  getUsers() {
    /* this.userService.getUsers().subscribe({
        next: (users) => {
          this.users = users;
          this.userCount = users.length;
        },
        error: (err) => {
          this.toastr.error(err.message);
        }
      }) */
  }

  verifyEmail(event: any) {
    const value = event;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,4}$/;
    this.isValidEmail = emailPattern.test(value);
    return this.isValidEmail;
  }

  addUser() {
    this.blockUI.start("Adding user...");
    /*  this.userService.upsertUser(this.userForm.value)
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
      }) */
    var buttonRef = document.getElementById("closeBtn");
    buttonRef.click();
    this.toastr.success("User has been added successfully");
    this.blockUI.stop();
  }

  getQuestions() {
    /* this.questionService.getQuestions().subscribe({
        next: (res) => {
          this.questions = res;
          this.questionCount = res.length;
        },
        error: (err) => {
          this.toastr.error(err.message);
        }
      }) */
  }

  addQuestion() {
    this.blockUI.start("Adding question...");
    var buttonRef = document.getElementById("closeQuestionBtn");
    /* this.questionService.addQuestion(this.questionsForm.value)
      .pipe(finalize(() => this.blockUI.stop()))
      .subscribe({
        next: (res) => {
          this.questionsForm.reset();
          var buttonRef = document.getElementById('closeQuestionBtn');
          buttonRef.click();
          this.toastr.success(res.message);
          this.getQuestions();
        },
        error: (err) => {
          this.toastr.error(err.message);
        }
     
      }) */

    //this.questions.push({ promptQuestion: this.questionsForm.value.question, subject: this.questionsForm.value.subject });
    buttonRef.click();
    this.toastr.success("successfully added new question");
    this.blockUI.stop();
  }

  modeGen(){
    const word = this.modeSrc.value.src.toLowerCase(); // Convert the search word to lowercase for case-insensitive search
    this.searchCliked=true;
    const result =  this.questions.filter((question) =>
      question.promptQuestion.toLowerCase().includes(word)
    );

    if(result.length)
    {

     this.found=true;
    }else{
      this.found=false;
    }
    

  }
}
