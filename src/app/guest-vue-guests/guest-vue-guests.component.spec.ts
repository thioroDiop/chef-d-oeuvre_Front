import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestVueGuestsComponent } from './guest-vue-guests.component';

describe('GuestVueGuestsComponent', () => {
  let component: GuestVueGuestsComponent;
  let fixture: ComponentFixture<GuestVueGuestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuestVueGuestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestVueGuestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
