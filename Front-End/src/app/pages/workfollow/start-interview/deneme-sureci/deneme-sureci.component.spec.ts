import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DenemeSureciComponent } from './deneme-sureci.component';

describe('DenemeSureciComponent', () => {
  let component: DenemeSureciComponent;
  let fixture: ComponentFixture<DenemeSureciComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DenemeSureciComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DenemeSureciComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
