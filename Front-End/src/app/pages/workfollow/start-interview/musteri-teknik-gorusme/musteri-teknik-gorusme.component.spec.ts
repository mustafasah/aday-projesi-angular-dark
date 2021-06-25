import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusteriTeknikGorusmeComponent } from './musteri-teknik-gorusme.component';

describe('MusteriTeknikGorusmeComponent', () => {
  let component: MusteriTeknikGorusmeComponent;
  let fixture: ComponentFixture<MusteriTeknikGorusmeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MusteriTeknikGorusmeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MusteriTeknikGorusmeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
