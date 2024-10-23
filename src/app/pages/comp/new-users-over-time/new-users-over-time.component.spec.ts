import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewUsersOverTimeComponent } from './new-users-over-time.component';

describe('NewUsersOverTimeComponent', () => {
  let component: NewUsersOverTimeComponent;
  let fixture: ComponentFixture<NewUsersOverTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewUsersOverTimeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewUsersOverTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
