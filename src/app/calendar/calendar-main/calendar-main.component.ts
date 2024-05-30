import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { takeUntil, Subject, filter } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { DateChangeHandlerService } from '../../services/date-change-handler.service';
import { CreateEventComponent } from '../../create-event/create-event.component';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-calendar-main',
  templateUrl: './calendar-main.component.html',
  styleUrls: ['./calendar-main.component.scss'],
})
export class CalendarMainComponent implements OnInit, OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();
  public displayedColumns: any = [
    {
      day: 'Sunday',
      dayIndex: 0,
      events: [],
      currentDate: null,
    },
    {
      day: 'Monday',
      dayIndex: 1,
      events: [],
      currentDate: null,
    },
    {
      day: 'Tuesday',
      dayIndex: 2,
      events: [],
      currentDate: null,
    },
    {
      day: 'Wendsday',
      dayIndex: 3,
      events: [],
      currentDate: null,
    },
    {
      day: 'Thursday',
      dayIndex: 4,
      events: [],
      currentDate: null,
    },
    {
      day: 'Friday',
      dayIndex: 5,
      events: [],
      currentDate: null,
    },
    {
      day: 'Saturday',
      dayIndex: 6,
      events: [],
      currentDate: null,
    },
  ];

  public mockedEvents = [
    {
      id: 0,
      event: 'Smoke Mod',
      time: new Date(2022, 10, 5),
    },
    {
      id: 1,
      event: 'Sing',
      time: new Date(98, 1),
    },
    {
      id: 2,
      event: 'Swimming class',
      time: new Date(2022, 11, 7),
    },
    {
      id: 3,
      event: 'Sing',
      time: new Date(2010, 5),
    },
    {
      id: 4,
      event: 'Swimming class 2',
      time: new Date(),
    },
  ];

  constructor(
    private dateChangeHandlerService: DateChangeHandlerService,
    public dialog: MatDialog
  ) {}

  public ngOnInit(): void {
    this.computeDate();
    this.dateChangeHandlerService.selectedDate$
      .pipe(filter(Boolean), takeUntil(this.destroy$))
      .subscribe((date: Date) => {
        this.computeDate(date);
      });

    this.dateChangeHandlerService.eventCreated$
      .pipe(filter(Boolean), takeUntil(this.destroy$))
      .subscribe((event: any) => {
        this.arrangeEventToDates(event);
      });

    this.dateChangeHandlerService.deleteElement$
      .pipe(filter(Boolean), takeUntil(this.destroy$))
      .subscribe((id: number) => {
        this.deleteelement(id);
      });
  }

  public computeDate(curr = new Date()) {
    const first = curr.getDate() - curr.getDay();
    const firstDay = new Date(curr.setDate(first));

    this.displayedColumns = this.displayedColumns.map(
      (item: any, idx: number) => {
        const currDate = new Date(firstDay.getTime() + 86400000 * idx + 1);
        item.currentDate = currDate;
        item.events = item.events.filter((item: any) => {
          return this.isDateYearEqual(item.time, currDate);
        });
        return item;
      }
    );

    this.arrangeEventToDates();
  }

  private deleteelement(id: number) {
    this.displayedColumns = [...this.displayedColumns].map((item: any) => {
      item.events = [...item.events].filter(
        (subItem: any) => subItem.id !== id
      );
      return item;
    });
  }

  private arrangeEventToDates(event?: any) {
    this.displayedColumns = this.displayedColumns.map((item: any) => {
      if (event && this.isDateYearEqual(event.time, item?.currentDate)) {
        this.mockedEvents = [...this.mockedEvents, event];
      }
      this.mockedEvents.forEach((mockedEvent) => {
        if (
          this.isDateYearEqual(mockedEvent.time, item?.currentDate) &&
          !item.events.includes(mockedEvent)
        ) {
          item.events = [...item.events, mockedEvent];
        }
      });
      return item;
    });
  }

  private isDateYearEqual(firstDate: Date, endDate: Date) {
    let isEqual = true;
    if (!firstDate || !endDate) {
      isEqual = false;
    }
    if (firstDate.getDate() !== endDate.getDate()) {
      isEqual = false;
    }
    if (firstDate.getFullYear() !== endDate.getFullYear()) {
      isEqual = false;
    }
    return isEqual;
  }

  public openDialog(item: any) {
    const dialogRef = this.dialog.open(CreateEventComponent, {
      width: '250px',
      data: {
        id: item.id,
        event: item.event,
        time: item.time,
        canRemove: true,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  public drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  public ngOnDestroy() {
    this.destroy$.next(true);
  }
}
