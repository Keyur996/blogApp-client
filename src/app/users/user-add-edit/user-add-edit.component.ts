import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { handleError } from 'src/app/shared/form-handle.class';
import { IUser } from '../models/user.model';
import { UsersService } from '../users.service';
import { userFormsValidations } from './user-from-validations.constant';

@Component({
  selector: 'app-user-add-edit',
  templateUrl: './user-add-edit.component.html',
  styleUrls: ['./user-add-edit.component.scss'],
})
export class UserAddEditComponent implements OnInit {
  userForm!: FormGroup;
  userFormsValidations: any = userFormsValidations;
  handleError: Function = handleError;
  isEdit: boolean = false;
  private userId: string | null = null;
  user!: IUser;

  constructor(
    private fb: FormBuilder,
    private $user: UsersService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.route.paramMap.subscribe({
      next: (paramMap: ParamMap) => {
        if (paramMap.has('id')) {
          this.userId = paramMap.get('id');
          this.isEdit = true;
          this.$user.getUser(this.userId!).subscribe({
            next: (res) => {
              this.user = res.data;
              this.userForm.setValue({
                firstname: this.user.firstname,
                lastname: this.user.lastname,
                email: this.user.email,
                phone: this.user.phone,
                dob: this.user.dob,
              });
            },
          });
        } else {
          this.isEdit = false;
          this.userId = null;
        }
      },
    });
  }

  initForm() {
    this.userForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      phone: [
        '',
        [
          Validators.required,
          Validators.min(1000000000),
          Validators.max(9999999999),
        ],
      ],
      dob: ['', Validators.required],
    });
  }

  onSubmit(userForm: FormGroup) {
    if (userForm.invalid) {
      return;
    }

    if (!this.isEdit) {
      this.$user.addUser(userForm.value);
    } else {
      this.$user.updateUser(userForm.value, this.userId!);
    }
  }
}
