import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService, SnackbarService, Task, User } from 'core';
import { of } from 'rxjs';
import { finalize, tap, catchError } from 'rxjs/operators';

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
    private _activateRoute: ActivatedRoute,
    private _router: Router,
    private _backend: BackendService,
    private _fb: FormBuilder,
    private _snackBarService: SnackbarService
  ) {
    this.initData();
  }

  get f() {
    return this.formGroup?.controls;
  }

  ngOnInit() {
    this.taskId = +this._activateRoute.snapshot.paramMap.get('id');
    this.getUserList();
    this.handleGetTask(this.taskId);
  }

  save() {
    this.setIsLoading(true);
    this._backend.update(this.taskId, this.formGroup.getRawValue()).pipe(
      catchError(err => {
        this._snackBarService.openSnackBar(err?.message, true);
        return of();
      }),
      finalize(() => this.setIsLoading())).subscribe((res) => {
        if (res) {
          this._snackBarService.openSnackBar(
            `Update task #${this.taskId} successfully`,
          );
          this.onCloseDetail();
        }
      })
  }

  completed() {
    this.f['completed'].setValue(true);
    this.formGroup.markAsDirty();
  }

  onCloseDetail() {
    this._router.navigate(['tasks']);
  }

  private handleGetTask(taskId: number) {
    this.setIsLoading(true);
    this.getTask(taskId).subscribe();
  }

  private getTask(taskId: number) {
    return this._backend.task(taskId).pipe(
      tap(res => {
        if (res) {
          this.isCompleted = res.completed;
          this.initData(res);
        }
      }),
      finalize(() => this.setIsLoading())
    );
  }

  private getUserList() {
    this._backend.users().subscribe(res => {
      if (res) {
        this.userList = res;
      }
    });
  }

  private setIsLoading(value?: boolean) {
    this.isLoading = value;
  }

  private initData(res?: Task) {
    this.formGroup = this._fb.group({
      description: [res?.description, Validators.required],
      assigneeId: {value: res?.assigneeId, disabled: this.isCompleted},
      completed: res?.completed
    });

    if (this.isCompleted) {
      this.formGroup.disable();
    }
  }
}
