import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from "app/shared/services/user.service";
import { BlockUI, NgBlockUI } from "ng-block-ui";
import { ToastrService } from "ngx-toastr";
import { finalize } from "rxjs";

@Component({
  selector: "userscmp",
  templateUrl: "users.component.html",
})
export class UsersComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  users = [
    { username: "user1", email: "user1@example.com" },
    { username: "user2", email: "user2@example.com" },
    { username: "user3", email: "user3@example.com" },
    { username: "user4", email: "user4@example.com" },
    { username: "user5", email: "user5@example.com" },
  ];
  userForm: FormGroup;

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.userForm = this.fb.group({
      username: ["", Validators.required],
      email: ["", Validators.required],
    });

    //this.getUsers();
  }

  getUsers() {
    this.blockUI.start("Retrieving a list of users...");
    this.userService
      .getUsers()
      .pipe(finalize(() => this.blockUI.stop()))
      .subscribe({
        next: (users) => {
          this.users = users;
        },
        error: (err) => {
          this.toastr.error(err.message);
        },
      });
  }

  editUser(user: any) {
    this.userForm.patchValue(user);
  }

  updateUser() {
    this.blockUI.start("Updating user...");
    /* if(this.userForm.valid) {
            this.userService.upsertUser(this.userForm.value)
            .pipe(finalize(() => this.blockUI.stop()))
            .subscribe({
                next: (res) => {
                    this.userForm.reset();
                    var buttonRef = document.getElementById('closeBtn');
                    buttonRef?.click();
                    this.toastr.success('User has been updated!')
                    this.getUsers();
                },
                error: (err) => {
                    this.toastr.error(err.message);
                }
            })
        } */
    var buttonRef = document.getElementById("closeBtn");
    buttonRef?.click();
    this.toastr.success("User has been updated!");
  }

  deleteUser(userId: number) {
    this.blockUI.start("Deleting user...");
    /* this.userService
      .deleteUser(userId)
      .pipe(finalize(() => this.blockUI.stop()))
      .subscribe({
        next: (res) => {
          this.toastr.success(res.message);
          this.getUsers();
        },
        error: (err) => {
          this.toastr.error(err.message);
        },
      });
  } */
  this.blockUI.stop();
}
}
