import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeklifGorusmesiComponent } from './teklif-gorusmesi.component';

describe('TeklifGorusmesiComponent', () => {
  let component: TeklifGorusmesiComponent;
  let fixture: ComponentFixture<TeklifGorusmesiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeklifGorusmesiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeklifGorusmesiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
