import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartInterviewComponent } from './start-interview.component';

describe('StartInterviewComponent', () => {
  let component: StartInterviewComponent;
  let fixture: ComponentFixture<StartInterviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartInterviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartInterviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
