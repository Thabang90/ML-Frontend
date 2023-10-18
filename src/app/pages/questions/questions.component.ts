import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { QuestionsService } from "app/shared/services/questions.service";
import { BlockUI, NgBlockUI } from "ng-block-ui";
import { ToastrService } from "ngx-toastr";
import { finalize } from "rxjs";

@Component({
    selector: 'questionscmp',
    templateUrl: 'questions.component.html'
})

export class QuestionsComponent implements OnInit{

    @BlockUI() blockUI: NgBlockUI;
    questionsForm: FormGroup;
    questions: any;

    constructor(
        private fb: FormBuilder,
        private questionService: QuestionsService,
        private toastr: ToastrService
    ) {}

    ngOnInit(){
       this.questionsForm = this.fb.group({
        id: [],
        promptQuestion: ['', Validators.required],
        subject: ['', Validators.required]
       }) 

       this.getQuestions();
    }


    getQuestions() {
        this.blockUI.start('Retrieving a list of questions...');
        this.questionService.getQuestions()
        .pipe(finalize(() => this.blockUI.stop()))
        .subscribe({
            next: (res) => {
              this.questions = res;
              console.log('res',this.questions)
            },
            error: (err) => {
              this.toastr.error(err.message);
            }
        })
    }

    editQuestion(question: any){
        this.questionsForm.patchValue(question);
    }

    updateQuestion() {
        this.blockUI.start('Updating question...');
        console.log(this.questionsForm.value)
        if(this.questionsForm.valid) {
            this.questionService.updateQuestion(this.questionsForm.value)
            .pipe(finalize(() => this.blockUI.stop()))
            .subscribe({
                next: (res) => {
                    this.questionsForm.reset();
                    var buttonRef = document.getElementById('closeBtn');
                    buttonRef?.click();
                    this.toastr.success('User has been updated!')
                    this.getQuestions();
                },
                error: (err) => {
                    this.toastr.error(err.message);
                }
            })
        }
    }

    deleteQuestion(questionId: number){
        this.blockUI.start('deleting the question...');
        this.questionService.deleteQuestion(questionId)
        .pipe(finalize(() => this.blockUI.stop()))
        .subscribe({
            next: (res) => {
                this.toastr.success(res.message);
                this.getQuestions();
            },
            error: (err) => {
                this.toastr.error(err.message)
            }
        })
    }
}
