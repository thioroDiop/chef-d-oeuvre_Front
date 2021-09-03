import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgbdModalConfigComponent } from './ngbd-modal-config.component';

describe('NgbdModalConfigComponent', () => {
  let component: NgbdModalConfigComponent;
  let fixture: ComponentFixture<NgbdModalConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgbdModalConfigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgbdModalConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
