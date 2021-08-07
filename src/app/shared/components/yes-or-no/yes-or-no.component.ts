import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-yes-or-no',
  templateUrl: './yes-or-no.component.html',
  styleUrls: ['./yes-or-no.component.scss']
})
export class YesOrNoComponent implements OnInit {


  constructor(
    public dialogRef: MatDialogRef<YesOrNoComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit(): void {
  }

  yes() {
    this.dialogRef.close(true)
  }

}
