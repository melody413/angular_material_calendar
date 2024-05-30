import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { DateChangeHandlerService } from '../services/date-change-handler.service';

export interface DialogData {
  event: string;
  time: Date;
  id: number;
  canRemove: boolean;
}

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss'],
})
export class CreateEventComponent {
  constructor(
    public dialogRef: MatDialogRef<CreateEventComponent>,
    private dateChangeHandlerService: DateChangeHandlerService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClose() {
    this.data.id = new Date().getTime();
    this.dateChangeHandlerService.eventCreated$.next(this.data);
  }

  onDelete(id: number) {
    this.dateChangeHandlerService.deleteElement$.next(id);
  }
}
