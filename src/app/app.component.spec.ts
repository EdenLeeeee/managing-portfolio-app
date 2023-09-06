import { TestBed, waitForAsync } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { BackendService } from 'core';
import { ChildrenOutletContexts } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AppComponent', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [AppComponent],
        imports: [BrowserAnimationsModule],
        providers: [
          { provide: BackendService, useValue: new BackendService() },
          ChildrenOutletContexts
        ]
      }).compileComponents();
    })
  );

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
