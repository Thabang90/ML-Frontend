import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from "app/shared/services/user.service";
import { LoginService } from "app/shared/services/login.service";
import Chart from "chart.js";
import { BlockUI, NgBlockUI } from "ng-block-ui";
import { ToastrService } from "ngx-toastr";
import { delay, finalize } from "rxjs";
import { QuestionsService } from "app/shared/services/questions.service";
import { UploadfileService } from "app/shared/services/uploadfile.service";
import { ChangeDetectorRef } from '@angular/core';
import { MlService } from 'app/shared/services/ml.servicce';


@Component({
  selector: "dashboard-cmp",
  templateUrl: "dashboard.component.html",
})
export class DashboardComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  userForm: FormGroup;
  questionsForm: FormGroup;
  modeSrc: FormGroup;
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

  questionsPapers = [
    { promptQuestion: "exam1", subject: "IT Fundamentals" },
    {
      promptQuestion: "exam12",
      subject: "Network Security",
    },
    {
      promptQuestion:
        "exam16",
      subject: "Web Development",
    },
    {
      promptQuestion: "semester1",
      subject: "Networking",
    },
    {
      promptQuestion: "semester5",
      subject: "Web Development",
    },
  ];
  list= [
    { year: 2008, questionNumber: 2, question: "How to configure Mesh network" },
    { year: 2001, questionNumber: 5, question: "What is an IP address?" },
    { year: 2015, questionNumber: 3, question: "Explain the concept of virtualization" },
    { year: 1995, questionNumber: 1, question: "Define object-oriented programming" },
    { year: 2022, questionNumber: 4, question: "Discuss the impact of artificial intelligence on society" },
    { year: 2010, questionNumber: 7, question: "Describe the principles of database normalization" },
    { year: 1999, questionNumber: 6, question: "What are the key features of Java programming language?" },
    { year: 2018, questionNumber: 9, question: "How does blockchain technology work?" },
    { year: 2005, questionNumber: 8, question: "Discuss the evolution of mobile communication technologies" },
    { year: 2013, questionNumber: 10, question: "Explain the role of quantum mechanics in modern computing" },
    { year: 2019, questionNumber: 12, question: "What are the advantages of cloud computing?" },
    { year: 2003, questionNumber: 15, question: "How does TCP/IP protocol stack work?" },
    { year: 2017, questionNumber: 13, question: "Discuss the principles of user interface design" },
    { year: 2006, questionNumber: 16, question: "What is the significance of the Turing test in artificial intelligence?" },
    { year: 2014, questionNumber: 18, question: "Explain the role of big data in business analytics" },
    { year: 2009, questionNumber: 11, question: "Discuss the security challenges in modern computer networks" }
  ];
  questionCount: number;
  found: boolean;
  searchCliked: boolean;
  FILE:any;
  QS:any;
  name:string;
  PDFs:boolean=false;
  router: any;
  //subject: string;
  //question: string;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService,
    private questionService: QuestionsService,
    private uploadfileService:UploadfileService,
    private cdr: ChangeDetectorRef,
    private mlService: MlService,

  ) {}

  ngOnInit() {
    this.getUsers();
    //this.getQuestions();

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
      src: ["", Validators.required],
    });
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
      });
  }

  verifyEmail(event: any) {
    const value = event;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,4}$/;
    this.isValidEmail = emailPattern.test(value);
    return this.isValidEmail;
  }

  addUser() {
    this.blockUI.start("Adding user...");
    this.userService.upsertUser(this.userForm.value)
      .pipe(finalize(() => this.blockUI.stop()))
      .subscribe({
        next: (res) => {
          this.userForm.reset();
          var buttonRef = document.getElementById('closeBtn');
          buttonRef.click();
          this.toastr.success('User has been added successfully');
          this.getUsers();
          this.blockUI.stop();
        },
        error: (err) => {
          this.toastr.error(err.message);
          this.blockUI.stop();
        }
      })
    var buttonRef = document.getElementById("closeBtn");
    buttonRef.click();
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

  modeGen() {
    
    let word = this.FILE.name.toLowerCase(); // Convert the search word to lowercase for case-insensitive search
    this.searchCliked = true;
    word = word.replace(/\.pdf$/, '');
    const result = this.questionsPapers.filter((question) =>
      question.promptQuestion.toLowerCase().includes(word)
    );
    const index = this.questionsPapers.findIndex((question) =>
    question.promptQuestion.toLowerCase().includes(word)
  );

    if (result.length) {
      this.found = true;
      if(word ==="exam12")
      {
        this.QS=this.list.slice(1, 3);
      }else if(word ==="exam1"){
        this.QS=this.list.slice(4, 7);
      }
      
      this.cdr.detectChanges();
      console.log("ending",this.QS,word);
    } else {
      this.found = false;

    }
  }

  uploadFile() {
    
    if (this.FILE && this.PDFs) {
      this.modeGen();
    }
    if(!this.PDFs)
    {
      //alert('Please upload a PDF file');
      this.toastr.warning("Please upload a PDF file");
    }

    this.mlService.uploadFile(this.FILE )
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
  selectFileChange(event:any):void {
    this.found = false;
    this.searchCliked = false;
    this.FILE = event.target.files[0];
    this.validateFileType();
    if (this.FILE &&  this.PDFs) {
      console.log('Selected file name:', this.FILE);
      this.found = true;
    } else {
      console.warn('No file selected.');
      if(!this.PDFs)
      {
        //alert('Please upload a PDF file');
        this.toastr.warning("Please upload a PDF file");
      }
      this.found = false;
    }
    
  }

  private validateFileType(): void {
    if (this.FILE.type === 'application/pdf') {
      this.PDFs=true
    } else {
      this.PDFs=false
    }
  }
}
