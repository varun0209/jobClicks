import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { JobclicksAddsComponent } from './components/jobclicks-adds/jobclicks-adds.component';
import { UploadResumeComponent } from './components/upload-resume/upload-resume.component';
import { TableComponent } from './components/table/table.component';
import { SharedImportModule } from '../shared-import';
import { YesOrNoComponent } from './components/yes-or-no/yes-or-no.component';
import { ToasterComponent } from './components/toaster/toaster.component';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import { AutocompleteChipComponent } from './components/autocomplete-chip/autocomplete-chip.component';
// import { HttpClientModule } from '@angular/common/http'
// import { CarouselModule } from 'ngx-owl-carousel-o';

@NgModule({
  declarations: [FileUploadComponent, JobclicksAddsComponent, UploadResumeComponent, TableComponent, 
    YesOrNoComponent, ToasterComponent, AutocompleteComponent, AutocompleteChipComponent ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedImportModule
    // CarouselModule
  ],
  exports: [FormsModule, ReactiveFormsModule, FileUploadComponent, JobclicksAddsComponent,
    UploadResumeComponent , TableComponent, YesOrNoComponent, ToasterComponent, AutocompleteComponent,
    AutocompleteChipComponent// CarouselModule
  ]
})
export class SharedModule { }
