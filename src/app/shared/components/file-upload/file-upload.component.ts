import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AlertInfo } from '../../../core/enums/alert-info';
import { CommonService } from '../../../core/services/common.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {


  @ViewChild('myFileInput') myFileInput;


  @Input() id = '';
  @Input() multiple = false;
  @Input() type = ''
  @Input() fileExtension = ['pdf', 'doc', 'docx', 'jpg'];
  @Input() fileUploadMessage: string;

  
  @Output() emitFilesList = new EventEmitter();
  @Output() emitImage = new EventEmitter();
  @Output() clearUploadedFile = new EventEmitter();

  fileList = [];
  @Input() set oldFileList(value) {
    if(value && typeof value == 'string') {
      // for(let o = 0; o < value.length; o++) {
        let obj = {
          name: this.getFileName(value),
          image: value
        }
        this.fileList.push(obj)
      // }
    } else if(!value) {
      this.fileList = []
    }
  }

  constructor(private commonService: CommonService) { }

  ngOnInit(): void {
   }

  getFileExtension(file) {
    return file && file.split('.').pop();
  }


  getFileName(file) {
    return file && file.split('/').pop();
  }

  onSelectFilebase(inputValue: any): void {
    let data = [...inputValue.target.files];
    for (let f = 0; f < data.length; f++) {
      if (this.fileExtension.length && !this.fileExtension.includes(this.getFileExtension(data[f].name))) {
        this.commonService.snackBar('Please upload ' + [...this.fileExtension] + 'only', AlertInfo.ERROR);
        this.myFileInput.nativeElement.value = '';
        return;
      }
      if (Math.round((data[f].size / 1024)) > 2048) {
        this.commonService.snackBar('The maximum supported file size 2 MB', AlertInfo.ERROR);
        this.myFileInput.nativeElement.value = '';
        return
      }
    };
    if (!this.multiple) {
      var myReader: FileReader = new FileReader();
      myReader.onloadend = (e: any) => {
        let url = e.target.result;
        var content = url.split(",");
        this.emitImage.emit(content);
      };
      myReader.readAsDataURL(data[0]);
    }
    this.fileList = data;
    this.emitFilesList.emit(data);
    this.myFileInput.nativeElement.value = '';
  }

  clearFile(i) {
    this.fileList = this.fileList.filter((res, index) => index != i);
    this.clearUploadedFile.emit(i)
  }

}
