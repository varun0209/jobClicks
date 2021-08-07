import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-jobpost',
  templateUrl: './jobpost.component.html',
  styleUrls: ['./jobpost.component.scss']
})
export class JobpostComponent implements OnInit {
  showpostjob = true;
  previewjob:any;
  constructor( private route: Router,) { }

  ngOnInit(): void {
   
  }

  previewjobpost($event){
    this.showpostjob = false;
    this.previewjob = $event;
  }

  previewjobpostcancel($event){
    this.showpostjob = true;
  }

  previewcancelpost($event){
    window.location.reload();
    this.route.navigateByUrl('/auth/employer/jobpost');
  }

  back(){
    this.showpostjob = false;
  }
}
