import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AppService } from '../../../core/services/app.service';
import { CommonService } from '../../../core/services/common.service';
import {switchMap, debounceTime, tap, finalize} from 'rxjs/operators';
import { HttpMethod } from '../../../core/enums/http-handlers';
// import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent implements OnInit {


  @Input() myControl = new FormControl();
  @Input() id: string
  @Input() text: string
  @Input() placeholder: string
  @Input() invalid = false;
  @Input() set disabled(value) {
    if(value) {
      this.myControl.disable();
    } else {
      this.myControl.enable();
    }
  }
  inputValue: any;

  @Input() set value(val) {
    if(val) {
      this.inputValue = val
    } else {
      this.myControl.patchValue('')
    }
  }

  @Output() valueEmit = new EventEmitter();
  @Output() valueSelectedEmit = new EventEmitter();

  filteredOptions: Observable<any[]>;
  

  optionsList = [];
  @Input() set options(list) {
    if(list && list.length) {
    this.optionsList = list
    if(this.inputValue) {
      const obj = this.optionsList.find(res => res[this.id] === this.inputValue)
      this.myControl.patchValue(obj)
    }
    this.filteredOptions = this.myControl.valueChanges
    .pipe(
      map(value => typeof value === 'string' ? value : value[this.text]),
      map(name => this._filter(name))
    );
    }
  }

  // @Input() set setValue(val) {
  //   if(val) {
  //     const obj = this.optionsList.find(res => res[this.id] === val)
  //     this.myControl.patchValue(obj)
  //   this.filteredOptions = this.myControl.valueChanges
  //   .pipe(
  //     map(value => typeof value === 'string' ? value : value[this.text]),
  //     map(name => this._filter(name))
  //   );
  //   }
  // }

  constructor(
    // private fb: FormBuilder, 
    // private appService: AppService,
    // private commonService: CommonService
    ) {}
  
    ngOnInit() {
    }
  
    displayFn(user): string {
      return user && user[this.text] ? user[this.text] : '';
    }
  
    private _filter(name: string) {
      const filterValue = name ? typeof name === 'string' ? name : name[this.text] : '';
      if(typeof this.myControl.value === 'string') {
        this.valueEmit.emit(this.myControl.value)
      } else {
        this.valueSelectedEmit.emit(this.myControl.value)
      }
      if(filterValue) {
        return this.optionsList.filter(option => filterValue && option[this.text].toLowerCase().indexOf(filterValue.toLowerCase()) === 0);
      }
    }

    showNoDataFount() {
      return this.myControl.value && typeof this.myControl.value === 'string'  && this._filter(this.myControl.value).length >= 0 ? true : false
    }

}

