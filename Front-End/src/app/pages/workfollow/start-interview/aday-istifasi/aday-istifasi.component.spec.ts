import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdayIstifasiComponent } from './aday-istifasi.component';

describe('AdayIstifasiComponent', () => {
  let component: AdayIstifasiComponent;
  let fixture: ComponentFixture<AdayIstifasiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdayIstifasiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdayIstifasiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
