import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopWidgetComponent } from './shop-widget.component';

describe('ShopWidgetComponent', () => {
  let component: ShopWidgetComponent;
  let fixture: ComponentFixture<ShopWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShopWidgetComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ShopWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
