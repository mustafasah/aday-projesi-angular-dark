import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateModalFormComponent } from './candidate-modal-form.component';

describe('CandidateModalFormComponent', () => {
  let component: CandidateModalFormComponent;
  let fixture: ComponentFixture<CandidateModalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidateModalFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateModalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
