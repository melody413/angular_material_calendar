import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';

import { CalendarComponentComponent } from './calendar-component.component';
import { CalendarSidebarComponent } from './calendar-sidebar/calendar-sidebar.component';
import { CalendarMainComponent } from './calendar-main/calendar-main.component';

@NgModule({
  declarations: [
    CalendarComponentComponent,
    CalendarSidebarComponent,
    CalendarMainComponent,
  ],
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatNativeDateModule,
    MatCardModule,
    DragDropModule,
    MatTableModule,
    MatFormFieldModule,
    MatDialogModule,
  ],
  exports: [CalendarComponentComponent],
})
export class CalendarModule {}
