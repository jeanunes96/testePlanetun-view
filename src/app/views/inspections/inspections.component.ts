import { Component,  OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import Inspection from 'src/app/models/Inspection';
import { InspectionService } from 'src/app/services/inspection.service';
import { InspectionDialogComponent } from 'src/app/shared/inspection.dialog/inspection.dialog.component';
import { ViewChild } from '@angular/core'

@Component({
  selector: 'app-inspections',
  templateUrl: './inspections.component.html',
  styleUrls: ['./inspections.component.scss'],
  providers: [InspectionDialogComponent]
})
export class InspectionsComponent implements OnInit {
  @ViewChild(MatTable)
  table! : MatTable<any>

  inspections: Inspection[] = [];
  
  displayedColumns: string[] = ["companyId","brokerCode","productCode","productName","inspectionNumber","actions"]

  constructor(
    public dialog: MatDialog,
    public inspectionService: InspectionService) {
      this.inspectionService.get()
      .subscribe(data => this.inspections = data)
    }

  ngOnInit(): void {}

  deleteInspection(companyId: number){
    this.inspectionService.deleteInspection(companyId)
    .subscribe(() =>{
      this.inspections = this.inspections.filter(i => i.companyId != companyId);
    })
  }

  openDialog(inspection: Inspection | null): void {
    const dialogRef = this.dialog.open(InspectionDialogComponent, {
      data: inspection != null ?
        inspection : {
          companyId : 0,
          brokerCode : '',
          productCode : '',
          productName : '',
          inspectionNumber : '',
        }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result !== undefined){
        if(this.inspections.map(i => i.companyId).includes(result.companyId)){
          this.inspectionService.update(result)
          .subscribe(data => {
            const index = this.inspections.findIndex(i => i.companyId === data.companyId);
            this.inspections[index] = data;
            this.table.renderRows();
          })
        } else {
          this.inspectionService.create(result)
          .subscribe(data => {
            this.inspections.push(data);
            this.table.renderRows();
          })
        }
      }
    });
  }

  updateInspection(inspection: Inspection){
    this.openDialog(inspection);

    if(this.inspections.map(i => i.companyId).includes(inspection.companyId)){
      this.inspectionService.update(inspection)
      .subscribe(data => {
        const index = this.inspections.findIndex(i => i.companyId === data.companyId);
        this.table.renderRows();
      })
    }
  }

}
