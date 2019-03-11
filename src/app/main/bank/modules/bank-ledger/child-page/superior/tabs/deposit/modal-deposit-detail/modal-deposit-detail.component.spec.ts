import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDepositDetailComponent } from './modal-deposit-detail.component';

describe('ModalDepositDetailComponent', () => {
  let component: ModalDepositDetailComponent;
  let fixture: ComponentFixture<ModalDepositDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDepositDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDepositDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
