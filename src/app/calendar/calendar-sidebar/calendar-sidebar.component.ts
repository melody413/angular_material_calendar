import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { DateChangeHandlerService } from '../../services/date-change-handler.service';
import { CreateEventComponent } from '../../create-event/create-event.component';

@Component({
  selector: 'app-calendar-sidebar',
  templateUrl: './calendar-sidebar.component.html',
  styleUrls: ['./calendar-sidebar.component.scss'],
})
export class CalendarSidebarComponent implements OnInit {
  public selected: Date | null;
  public time: Date;
  public event: string;

  constructor(
    private dateChangeService: DateChangeHandlerService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  public valueChanged(event: any) {
    this.dateChangeService.selectedDate$.next(new Date(event));
  }

  public openDialog() {
    const dialogRef = this.dialog.open(CreateEventComponent, {
      width: '250px',
      data: { event: this.event, time: this.time, canRemove: false },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.event = result;
    });
  }
}
