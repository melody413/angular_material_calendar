import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarSidebarComponent } from './calendar-sidebar.component';

describe('CalendarSidebarComponent', () => {
  let component: CalendarSidebarComponent;
  let fixture: ComponentFixture<CalendarSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarSidebarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
