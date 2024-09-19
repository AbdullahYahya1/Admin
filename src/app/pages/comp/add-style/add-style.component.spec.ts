import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStyleComponent } from './add-style.component';

describe('AddStyleComponent', () => {
  let component: AddStyleComponent;
  let fixture: ComponentFixture<AddStyleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddStyleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddStyleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
