import { NgModule } from '@angular/core';
import { TaskComponent } from './task.component';
import { TaskRoutingModule } from './task-routing.module';
import { BackendService } from 'core';

@NgModule({
  declarations: [TaskComponent],
  imports: [TaskRoutingModule],
  providers: [BackendService]
})
export class TaskModule {}
