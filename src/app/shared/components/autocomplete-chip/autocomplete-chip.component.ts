import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import { Observable, pipe } from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-autocomplete-chip',
  templateUrl: './autocomplete-chip.component.html',
  styleUrls: ['./autocomplete-chip.component.scss']
})
export class AutocompleteChipComponent  {

  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];

  chipCtrl = new FormControl();
  filteredChip: Observable<any[]>;
  @Input() placeholder: string
  @Input() values: string[] = [];

  @Input() set valuesData(val) {
    if(val && Array.isArray(val) && val.length) {
      this.values = val;
    } else {
      this.values = [];
    }
  }

  @Input() set clearSelectedValue(val) {
    if(val) {
      this.clearValue()
    }
  }

  allChipList = [];

  @Input() id: string
  @Input() text: string
  @Input() set options(list) {
    if(list && list.length) {
      this.allChipList = list
      this.filteredChip = this.chipCtrl.valueChanges.pipe(
        map(value => typeof value === 'string' ? value : value),
        map(name => this._filter(name))
      );
    }
  }
  
  @ViewChild('chipInput') chipInput: ElementRef;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  @Output() valueSelectedEmit = new EventEmitter();

  constructor() {
    this.filteredChip = this.chipCtrl.valueChanges.pipe(
        map(value => typeof value === 'string' ? value : value),
        map(name => this._filter(name))
      );
  }

  private _filter(value: string) {
    const filterValue = value ? typeof value === 'string' ? value : value[this.text] : '';
    return this.allChipList.filter(option => filterValue && option[this.text].toLowerCase().indexOf(filterValue.toLowerCase()) === 0);

  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our item
    if ((value || '').trim()) {
      this.values.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.chipCtrl.setValue(null);
  }

  remove(item: string): void {
    const index = this.values.indexOf(item);

    if (index >= 0) {
      this.values.splice(index, 1);
      this.valueSelectedEmit.emit(this.values);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    if(this.values && this.values.some(res => res === event.option.value[this.text])) {
    this.chipInput.nativeElement.value = '';
    this.chipCtrl.setValue(null);
      return
    }
    this.values.push(event.option.viewValue);
    this.valueSelectedEmit.emit(this.values);
    this.chipInput.nativeElement.value = '';
    this.chipCtrl.setValue(null);
  }

  clearValue() {
    this.chipInput.nativeElement.value = '';
    this.chipCtrl.setValue(null);
  }

  displayFn(user): string {
    return user && user[this.text] ? user[this.text] : '';
  }

  showNoDataFount() {
    return this.chipCtrl.value && typeof this.chipCtrl.value === 'string'  && this._filter(this.chipCtrl.value).length >= 0 ? true : false
  }

}

