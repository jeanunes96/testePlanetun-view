import { Component, OnInit } from '@angular/core';
import { Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import Inspection from 'src/app/models/Inspection';

@Component({
  selector: 'app-inspection.dialog',
  templateUrl: './inspection.dialog.component.html',
  styleUrls: ['./inspection.dialog.component.scss']
})
export class InspectionDialogComponent implements OnInit {
  isChange! : boolean;
  constructor(
    public dialogRef: MatDialogRef<InspectionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Inspection,
  ) {}

  ngOnInit(): void {
    console.log(this.data);
    this.isChange = false;
    if(this.data.companyId !== 0)
      this.isChange = true;
  }

  onCancel(){
    this.dialogRef.close();
  }

}
