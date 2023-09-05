import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BackendService, Task } from 'core';
import { of } from 'rxjs';
import { catchError, finalize, switchMap, tap } from 'rxjs/operators';
import { AddTaskDialogComponent } from './add-task-dialog/add-task-dialog.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  tasks: Task[] = [];
  isLoading: boolean;
  isShowDetail: boolean;

  constructor(private backend: BackendService, private dialog: MatDialog) {}

  ngOnInit() {
    this.handleGetTaskListData();
  }

  addTask() {
    this.dialog
      .open(AddTaskDialogComponent, {
        disableClose: true,
        width: '500px'
      })
      .afterClosed()
      .subscribe(description => {
        if (!description) return;

        this.setIsLoading(true);
        this.backend
          .newTask({ description })
          .pipe(
            switchMap(() => this.getTaskListData()),
            finalize(() => this.setIsLoading())
          )
          .subscribe();
      });
  }

  completed(taskId: number) {
    this.setIsLoading(true);
    this.backend
      .complete(taskId, true)
      .pipe(
        switchMap(() => this.getTaskListData()),
        catchError(err => {
          console.log(err);
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
    return this.backend.tasks().pipe(
      tap(res => {
        console.log(res);
        this.tasks = res || [];
      }),
      finalize(() => this.setIsLoading())
    );
  }
}
