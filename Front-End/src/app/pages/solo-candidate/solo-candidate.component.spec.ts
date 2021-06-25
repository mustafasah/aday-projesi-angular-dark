import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoloCandidateComponent } from './solo-candidate.component';

describe('SoloCandidateComponent', () => {
  let component: SoloCandidateComponent;
  let fixture: ComponentFixture<SoloCandidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoloCandidateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoloCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
