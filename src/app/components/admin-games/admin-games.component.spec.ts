import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGamesComponent } from './admin-games.component';

describe('AdminGamesComponent', () => {
  let component: AdminGamesComponent;
  let fixture: ComponentFixture<AdminGamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminGamesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
