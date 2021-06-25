import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeklifVerilenlerComponent } from './teklif-verilenler.component';

describe('TeklifVerilenlerComponent', () => {
  let component: TeklifVerilenlerComponent;
  let fixture: ComponentFixture<TeklifVerilenlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeklifVerilenlerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeklifVerilenlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
