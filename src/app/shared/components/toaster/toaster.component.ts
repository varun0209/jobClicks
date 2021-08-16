import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { AlertInfo } from '../../../core/enums/alert-info';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.scss']
})
export class ToasterComponent implements OnInit {

  image: string;

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }

  ngOnInit(): void {
    if(this.data.type === AlertInfo.SUCCESS) {
      this.image = 'assets/images/success_icon.svg';
    } else if(this.data.type === AlertInfo.ERROR) {
      this.image = 'assets/images/error_icon.svg';
    }
  }

}
