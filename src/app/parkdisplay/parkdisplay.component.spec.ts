import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkdisplayComponent } from './parkdisplay.component';

describe('ParkdisplayComponent', () => {
  let component: ParkdisplayComponent;
  let fixture: ComponentFixture<ParkdisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParkdisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkdisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
