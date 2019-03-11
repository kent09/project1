import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderBitcoinDataComponent } from './header-bitcoin-data.component';

describe('HeaderBitcoinDataComponent', () => {
  let component: HeaderBitcoinDataComponent;
  let fixture: ComponentFixture<HeaderBitcoinDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderBitcoinDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderBitcoinDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
