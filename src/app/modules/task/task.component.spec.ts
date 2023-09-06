/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskComponent } from './task.component';
import { BackendService, Constant, SnackbarService, Task } from 'core';
import { of } from 'rxjs';
import { SharedModule } from 'shared';
import { TaskListComponent } from './task-list/task-list.component';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogRef } from '@angular/material/dialog';

describe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;
  let backendService: BackendService;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [TaskComponent, TaskListComponent],
        imports: [
          SharedModule,
          RouterTestingModule,
          RouterModule,
          BrowserAnimationsModule
        ],
        providers: [BackendService, Constant, SnackbarService]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;
    backendService = TestBed.inject(BackendService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be call add Task finish', () => {
    const newTask: Task = {
      id: 55,
      description: 'test',
      assigneeId: null,
      completed: false
    };
    const spy = spyOn(backendService, 'newTask').and.returnValue(of(newTask));
    const fakeDialog = spyOn(component._dialog, 'open').and.returnValue(
      {
        afterClosed: () => of('description test')
      } as MatDialogRef<typeof component>
    );
    component.addTask();
    expect(spy).toHaveBeenCalled();
    expect(fakeDialog).toHaveBeenCalled();
  });

  it('should be call completed', () => {
    const taskNeedToUpdate = {
      id: 1
    };
    const tasks = [
      {
        id: 0,
        description: 'Install a monitor arm',
        assigneeId: 111,
        assignee: 'Mike',
        completed: false
      },
      {
        id: 1,
        description: 'Move the desk to the new location',
        assigneeId: 111,
        assignee: 'Mike',
        completed: true
      }
    ];
    const spy = spyOn(backendService, 'complete').and.returnValue(
      of(taskNeedToUpdate)
    );
    const spyGetTask = spyOn(backendService, 'tasks').and.returnValue(
      of(tasks)
    );
    component.completed(1);
    expect(spy).toHaveBeenCalled();
    expect(spyGetTask).toHaveBeenCalled();
  });
});
