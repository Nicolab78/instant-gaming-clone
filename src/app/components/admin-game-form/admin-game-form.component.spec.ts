import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGameFormComponent } from './admin-game-form.component';

describe('AdminGameFormComponent', () => {
  let component: AdminGameFormComponent;
  let fixture: ComponentFixture<AdminGameFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminGameFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminGameFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
