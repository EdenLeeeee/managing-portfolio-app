/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BackendService, SnackbarService } from 'core';
import { of } from 'rxjs';
import { SharedModule } from 'shared';
import { TaskDetailComponent } from './task-detail.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('TaskDetailComponent', () => {
  let component: TaskDetailComponent;
  let fixture: ComponentFixture<TaskDetailComponent>;
  const fakeActivatedRoute = {
    snapshot: {
      paramMap: convertToParamMap({
        id: '1'
      })
    }
  };
  let backendService: BackendService;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [TaskDetailComponent],
        imports: [SharedModule, RouterTestingModule, BrowserAnimationsModule],
        providers: [
          { provide: ActivatedRoute, useValue: fakeActivatedRoute },
          BackendService,
          SnackbarService
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskDetailComponent);
    component = fixture.componentInstance;
    backendService = TestBed.inject(BackendService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be call save', () => {
    const taskNeedToUpdate = {
      id: 1
    };
    const spy = spyOn(backendService, 'update').and.returnValue(
      of(taskNeedToUpdate)
    );
    component.save();
    expect(spy).toHaveBeenCalled();
  });
});
