import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IkGorusmesiComponent } from './ik-gorusmesi.component';

describe('IkGorusmesiComponent', () => {
  let component: IkGorusmesiComponent;
  let fixture: ComponentFixture<IkGorusmesiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IkGorusmesiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IkGorusmesiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
