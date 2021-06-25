import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusteriIkGorusmesiComponent } from './musteri-ik-gorusmesi.component';

describe('MusteriIkGorusmesiComponent', () => {
  let component: MusteriIkGorusmesiComponent;
  let fixture: ComponentFixture<MusteriIkGorusmesiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MusteriIkGorusmesiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MusteriIkGorusmesiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
