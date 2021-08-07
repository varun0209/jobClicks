import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../../../core/services/common.service';
import { AlertInfo } from '../../../core/enums/alert-info';

@Component({
  selector: 'app-upload-resume',
  templateUrl: './upload-resume.component.html',
  styleUrls: ['./upload-resume.component.scss']
})
export class UploadResumeComponent implements OnInit {

  @ViewChild('myFileInput1') myFileInput1;
  @ViewChild('myFileInput2') myFileInput2;

  @Output() uploadResume = new EventEmitter()

  formUpload: FormGroup;

  @Input() fileExtension = ['pdf', 'doc', 'docx'];


  constructor(
    private fb: FormBuilder,
    private commonService: CommonService,
    public dialogRef: MatDialogRef<UploadResumeComponent>,
  ) { }

  ngOnInit(): void {
    this.formUploadModel()
  }

  formUploadModel() {

    this.formUpload = this.fb.group({
      Resume: ['', Validators.required],
      CoverLater: ['']
    });
  }

  getFileExtension(file) {
    return file.split('.').pop().toLowerCase();
  }

  onSelectFilebase(inputValue: any, key): void {
    let data = [...inputValue.target.files];
    for (let f = 0; f < data.length; f++) {
      if (this.fileExtension.length && !this.fileExtension.includes(this.getFileExtension(data[f].name))) {
        this.commonService.snackBar('Please upload ' + [...this.fileExtension] + 'only', AlertInfo.ERROR);
        this.clearFileValue();
        return;
      }
      // if (Math.round((data[f].size / 1024)) < 2048) {
      //   this.commonService.snackBar('file size extis 2MB');
      //    this.clearFileValue();
      //   return
      // }
    };
    this.formUpload.patchValue({
      [key]: data[0]
    })
    this.clearFileValue();
  }

  clearFileValue() {
    if (this.myFileInput1) {
      this.myFileInput1.nativeElement.value = '';
    }
    if (this.myFileInput2) {
      this.myFileInput2.nativeElement.value = '';
    }
  }

  clearFile(key) {
    this.formUpload.patchValue({
      [key]: null
    })
  }


  // employee forgot password email
  submit() {
    if (this.formUpload.invalid) {
      return;
    }
    this.uploadResume.emit(this.formUpload.value);
    this.dialogRef.close(this.formUpload.value);
  }

  close() {
    this.uploadResume.emit(null);
    this.dialogRef.close(null);
  }


}
