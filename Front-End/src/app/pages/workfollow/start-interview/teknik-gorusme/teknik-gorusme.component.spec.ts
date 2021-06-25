import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeknikGorusmeComponent } from './teknik-gorusme.component';

describe('TeknikGorusmeComponent', () => {
  let component: TeknikGorusmeComponent;
  let fixture: ComponentFixture<TeknikGorusmeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeknikGorusmeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeknikGorusmeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
