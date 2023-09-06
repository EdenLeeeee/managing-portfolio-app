import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BackendService, SnackbarService, Task } from 'core';
import { of } from 'rxjs';
import { catchError, finalize, switchMap, tap } from 'rxjs/operators';
import { AddTaskDialogComponent } from './add-task-dialog/add-task-dialog.component';
import { TaskListComponent } from './task-list/task-list.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  @ViewChild('appTaskList') appTaskList: TaskListComponent;

  tasks: Task[] = [];
  isLoading: boolean;
  isShowDetail: boolean;

  constructor(
    public _dialog: MatDialog,
    private _backend: BackendService,
    private _snackBarService: SnackbarService
  ) {}

  ngOnInit() {
    this.handleGetTaskListData();
  }

  addTask() {
    this._dialog
      .open(AddTaskDialogComponent, {
        disableClose: true,
        width: '500px'
      })
      .afterClosed()
      .subscribe(description => {
        if (!description) return;

        this.setIsLoading(true);
        this._backend
          .newTask({ description })
          .pipe(
            switchMap(() => {
              this._snackBarService.openSnackBar('Add task successfully');
              return this.getTaskListData();
            }),
            finalize(() => this.setIsLoading())
          )
          .subscribe();
      });
  }

  completed(taskId: number) {
    this.setIsLoading(true);
    this._backend
      .complete(taskId, true)
      .pipe(
        switchMap(() => {
          this._snackBarService.openSnackBar(
            `Complete task #${taskId} successfully`
          );
          return this.getTaskListData();
        }),
        catchError(err => {
          this._snackBarService.openSnackBar(err?.message, true);
          return of();
        }),
        finalize(() => this.setIsLoading())
      )
      .subscribe();
  }

  private handleGetTaskListData() {
    this.setIsLoading(true);
    this.getTaskListData().subscribe();
  }

  private setIsLoading(value?: boolean) {
    this.isLoading = value;
  }

  private getTaskListData() {
    return this._backend.tasks().pipe(
      tap(res => {
        this.tasks = res || [];
      }),
      finalize(() => this.setIsLoading())
    );
  }
}
