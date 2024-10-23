import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssgintoDriverComponent } from './assginto-driver.component';

describe('AssgintoDriverComponent', () => {
  let component: AssgintoDriverComponent;
  let fixture: ComponentFixture<AssgintoDriverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssgintoDriverComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssgintoDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
