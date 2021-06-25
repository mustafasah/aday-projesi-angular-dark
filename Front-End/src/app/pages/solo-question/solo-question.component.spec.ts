import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoloQuestionComponent } from './solo-question.component';

describe('SoloQuestionComponent', () => {
  let component: SoloQuestionComponent;
  let fixture: ComponentFixture<SoloQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoloQuestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoloQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
