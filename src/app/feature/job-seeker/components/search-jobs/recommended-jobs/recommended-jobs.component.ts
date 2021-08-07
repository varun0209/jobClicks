import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-recommended-jobs',
  templateUrl: './recommended-jobs.component.html',
  styleUrls: ['./recommended-jobs.component.scss']
})
export class RecommendedJobsComponent implements OnInit {

  @Input() showApplyButton = true;

  constructor() { }

  ngOnInit(): void {
  }

}
