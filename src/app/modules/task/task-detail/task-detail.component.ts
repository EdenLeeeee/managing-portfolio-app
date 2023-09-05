import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService, Task, User } from 'core';
import { finalize, tap } from 'rxjs/operators';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {
  taskId: number;
  isLoading: boolean;
  userList: User[] = [];
  formGroup: FormGroup;
  isCompleted: boolean;

  @Output() closeDetail = new EventEmitter();

  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    private backend: BackendService,
    private fb: FormBuilder
  ) {
    this.initData();
  }

  get f() {
    return this.formGroup?.controls;
  }

  ngOnInit() {
    this.taskId = +this.activateRoute.snapshot.paramMap.get('id');
    this.getUserList();
    this.handleGetTask(this.taskId);
  }

  save() {
    console.log('save');
    console.log(this.formGroup.getRawValue());
    this.setIsLoading(true);
    this.backend.update(this.taskId, this.formGroup.getRawValue()).pipe(
      finalize(() => this.setIsLoading())).subscribe((res) => {
        if (res) {
          this.onCloseDetail();
        }
      })
  }

  completed() {
    this.f['completed'].setValue(true);
    this.formGroup.markAsDirty();
  }

  onCloseDetail() {
    this.router.navigate(['tasks']);
  }

  private handleGetTask(taskId: number) {
    this.setIsLoading(true);
    this.getTask(taskId).subscribe();
  }

  private getTask(taskId: number) {
    return this.backend.task(taskId).pipe(
      tap(res => {
        console.log(res);
        if (res) {
          this.isCompleted = res.completed;
          this.initData(res);
        }
      }),
      finalize(() => this.setIsLoading())
    );
  }

  private getUserList() {
    this.backend.users().subscribe(res => {
      if (res) {
        this.userList = res;
      }
    });
  }

  private setIsLoading(value?: boolean) {
    this.isLoading = value;
  }

  private initData(res?: Task) {
    this.formGroup = this.fb.group({
      description: [res?.description, Validators.required],
      assigneeId: {value: res?.assigneeId, disabled: this.isCompleted},
      completed: res?.completed
    });

    if (this.isCompleted) {
      console.log('cccc');
      this.formGroup.disable();
    }
  }
}
