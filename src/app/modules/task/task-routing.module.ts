import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { TaskComponent } from './task.component';

const routes: Routes = [
  {
    path: '',
    component: TaskComponent,
    data: { animation: 'isLeft' }
  },
  {
    path: ':id',
    component: TaskDetailComponent,
    data: { animation: 'isRight' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRoutingModule {}
