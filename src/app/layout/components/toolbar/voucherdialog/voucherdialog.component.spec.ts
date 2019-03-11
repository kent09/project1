import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoucherdialogComponent } from './voucherdialog.component';

describe('VoucherdialogComponent', () => {
  let component: VoucherdialogComponent;
  let fixture: ComponentFixture<VoucherdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoucherdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoucherdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
