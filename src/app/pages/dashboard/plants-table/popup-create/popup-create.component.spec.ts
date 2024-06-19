import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupCreateComponent } from './popup-create.component';

describe('PopupCreateComponent', () => {
  let component: PopupCreateComponent;
  let fixture: ComponentFixture<PopupCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopupCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
