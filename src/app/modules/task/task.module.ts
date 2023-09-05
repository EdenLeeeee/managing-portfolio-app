import { NgModule } from '@angular/core';
import { TaskComponent } from './task.component';
import { TaskRoutingModule } from './task-routing.module';
import { BackendService } from 'core';
import { TaskListComponent } from './task-list/task-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { AddTaskDialogComponent } from './add-task-dialog/add-task-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    TaskComponent,
    TaskListComponent,
    AddTaskDialogComponent,
    TaskDetailComponent
  ],
  imports: [
    TaskRoutingModule,
    MatTableModule,
    MatProgressBarModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    MatDialogModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule
  ],
  providers: [BackendService]
})
export class TaskModule {}
