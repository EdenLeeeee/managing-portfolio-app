import { NgModule } from '@angular/core';
import { BackendService, Constant, SnackbarService } from 'core';
import { SharedModule } from 'shared';
import { AddTaskDialogComponent } from './add-task-dialog/add-task-dialog.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskRoutingModule } from './task-routing.module';
import { TaskComponent } from './task.component';

@NgModule({
  declarations: [
    TaskComponent,
    TaskListComponent,
    AddTaskDialogComponent,
    TaskDetailComponent
  ],
  imports: [TaskRoutingModule, SharedModule],
  providers: [BackendService, Constant, SnackbarService]
})
export class TaskModule {}
