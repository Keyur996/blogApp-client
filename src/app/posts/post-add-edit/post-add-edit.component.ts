import { Component, OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { handleError } from 'src/app/shared/form-handle.class';
import { postFormValidations } from './post-form-validations.contants';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { IUser } from 'src/app/users/models/user.model';
import * as _ from 'lodash';
import { FileService } from '../file.service';
import { IPost } from '../models/post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-add-edit',
  templateUrl: './post-add-edit.component.html',
  styleUrls: ['./post-add-edit.component.scss'],
})
export class PostAddEditComponent implements OnInit {
  addOnBlur = true;
  private postId!: string | null;
  private post!: IPost;
  postForm!: FormGroup;
  isEdit: boolean = false;
  handleError: Function = handleError;
  postFormValidations: any = postFormValidations;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  tags: string[] = [];
  users: IUser[] = [];
  files: string[] = [];
  filesObjArr: any[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private $file: FileService,
    private $post: PostsService
  ) {}

  ngOnInit(): void {
    this.users = this.route.snapshot.data?.['users'].data || [];
    this.initForm();
    this.route.paramMap.subscribe({
      next: (paramMap: ParamMap) => {
        if (paramMap.has('id')) {
          this.postId = paramMap.get('id');
          this.isEdit = true;
          this.$post.getPostById(this.postId!).subscribe({
            next: (res) => {
              this.post = res.data;
              this.postForm.setValue({
                title: this.post.title,
                description: this.post.description,
                tags: this.post.tags,
                user: this.post.user._id || this.post.user,
                images: this.post.images,
              });
              this.files = [...this.post.images] as string[];
              this.filesObjArr = [...this.post.images];
              this.tags = [...this.post.tags];
            },
          });
        } else {
          this.postId = null;
          this.isEdit = false;
        }
      },
    });
  }

  initForm() {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      description: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(200)]),
      ],
      tags: [null, Validators.required],
      images: [null, Validators.required],
      user: [null, Validators.required],
    });
  }

  updateTagsData(tags: string[]) {
    this.postForm.patchValue({
      tags: tags,
    });
    this.postForm.updateValueAndValidity();
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    // Add our fruit
    if (value) {
      this.tags.push(value);
      this.updateTagsData(this.tags);
    }
    // Clear the input value
    event.chipInput!.clear();
  }

  removeTag(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
      this.updateTagsData(this.tags);
    }
  }

  imagePicked(event: Event) {
    if (
      (event.target as HTMLInputElement).files! &&
      (event.target as HTMLInputElement).files![0]
    ) {
      var filesAmount = (event.target as HTMLInputElement).files;
      for (let i = 0; i < filesAmount!.length; i++) {
        var reader = new FileReader();

        reader.onload = (event: any) => {
          this.files.push(event.target.result);
          this.filesObjArr.push(filesAmount![i]);

          this.postForm.patchValue({
            images: [...this.filesObjArr],
          });
        };

        reader.readAsDataURL((event.target as HTMLInputElement).files![i]);
      }
    }
  }
  // Submit form
  onSubmit(postForm: FormGroup) {
    if (postForm.invalid) {
      return;
    }
    const files = postForm.value['images'] || [];
    const fileToUpload: any[] = _.remove(
      files,
      (_file) => _file instanceof Blob
    );
    if (fileToUpload.length) {
      const formData = new FormData();
      _.forEach(fileToUpload || [], (_file) => {
        formData.append('files', _file);
      });
      this.$file.uploadFiles(formData).subscribe({
        next: (res: { success: boolean; files: string[] }) => {
          const post = {
            ...postForm.value,
            images: res.files.concat(files),
          };
          this.addOrUpdateProcess(post);
        },
      });
    } else {
      this.addOrUpdateProcess(postForm.value);
    }
  }

  addOrUpdateProcess(post: IPost) {
    if (!this.isEdit) {
      this.$post.createPost(post);
    } else {
      this.$post.updatePost(post, this.postId!);
    }
  }
}
