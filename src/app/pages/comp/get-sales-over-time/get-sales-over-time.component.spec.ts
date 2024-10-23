import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetSalesOverTimeComponent } from './get-sales-over-time.component';

describe('GetSalesOverTimeComponent', () => {
  let component: GetSalesOverTimeComponent;
  let fixture: ComponentFixture<GetSalesOverTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetSalesOverTimeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetSalesOverTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
