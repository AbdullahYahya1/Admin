import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetSalesByCategoryComponent } from './get-sales-by-category.component';

describe('GetSalesByCategoryComponent', () => {
  let component: GetSalesByCategoryComponent;
  let fixture: ComponentFixture<GetSalesByCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetSalesByCategoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetSalesByCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
