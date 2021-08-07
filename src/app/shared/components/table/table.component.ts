import { Component, OnInit, Input, ViewChild, OnChanges, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CommonService } from '../../../core/services/common.service';
import { YesOrNoComponent } from '../yes-or-no/yes-or-no.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  // table props
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource: MatTableDataSource<any>;
  columnDefinitions = [];
  tableObj: any;
  filterTable = '';
  allChecked = false;

  @Output() onLinkClickEmit = new EventEmitter();
  @Output() onCheckboxClickEmit = new EventEmitter();
  @Output() onDropdownClickEmit = new EventEmitter();
  @Output() onEditRowEmit = new EventEmitter();

  @Input() set tableData(res) {
    if (!this.commonService.checkNullOrUndefined(res)) {
      this.defaultValues();
      this.tableObj = res;
      this.tableDataFunc(res)
    }
  }

  defaultValues() {
    this.allChecked = false;
    this.filterTable = '';
    this.tableObj = null;
    this.dataSource = new MatTableDataSource();
    this.columnDefinitions = [];
  }

  constructor(public commonService: CommonService) { }

  ngOnInit() {
  }


  reset() {
  }


  doFilter = (value) => {
    this.dataSource.filter = value.target.value.trim().toLocaleLowerCase();
    this.allChecked = false;
  }

  tableDataFunc(data) {
    this.dataSource = new MatTableDataSource();

    if (!this.commonService.checkNullOrUndefined(data.list)) {
      if (data.list.length) {
        this.tableDataUpdate(data.list);
      }
    }

    if (!this.commonService.checkNullOrUndefined(data.list) && data.list.length) {

      this.columnDefinitions = [];

      data.columns.forEach(cols => {
        const obj = { 
          def: cols.key, 
          label: cols.label, 
          type: cols.type ? cols.type : '', 
          hide: cols.hiide ? cols.hide : true,
          ...cols
        }
        this.columnDefinitions.push(obj)
      });

    }

  }

  displayLable(col) {
    return this.columnDefinitions.find(res => res.def == col)
  }

  onLink(ele) {
      this.onLinkClickEmit.emit(ele);
  }


  checkAll(event) {
    this.allChecked = true;
    const checked = event.target.checked;
    const obj = { value: checked, element: 'all', data: this.dataSource.data };
    this.onCheckboxClickEmit.emit(obj);
    let list = [ ...this.dataSource.data ]; 
    list.map(res =>{ 
       if(this.dataSource.filteredData.some(resp => resp[this.tableObj.uniqueKey] === res[this.tableObj.uniqueKey])) {
            res.checked = checked  ? true : false 
       }})
    // this.tableDataUpdate(list);
  }

  checkboxClick(event,element) {
    const checked = event.target.checked;
    const obj = { value: checked, element: element, data: this.dataSource.data };
    this.onCheckboxClickEmit.emit(obj);
    let list = [ ...this.dataSource.data ];
    list.map(res =>  res.checked = res[this.tableObj.uniqueKey] === element[this.tableObj.uniqueKey] ? checked ? true : false  : res.checked )
    // this.tableDataUpdate(list);
  }

  tableDataUpdate(data) {
    this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      // this.filterTable = '';
  }

  

  dropdownClick(value,column,element) {
    this.confirmationPopup(value, (flag) => {
      if(flag) {
        const obj = { value: value, element: element, data: this.dataSource.data};
        this.onDropdownClickEmit.emit(obj);
        let list = [ ...this.dataSource.data ];
        list.map(res =>  res[column] = res[this.tableObj.uniqueKey] === element[this.tableObj.uniqueKey] ? value  : res[column] )
        this.tableDataUpdate(list);
      } else {
        let list = [ ...this.dataSource.data ];
        this.dataSource = new MatTableDataSource()
        this.tableDataUpdate(list);
      }
    })
  }

  onEditRow(row) {
    this.onEditRowEmit.emit(row)
  }

  confirmationPopup(value,callBack) {
    const obj = {
      template: YesOrNoComponent,
      data: {
        description: `Do you want to <span class='in-active-text'>${value ? 'Active' : 'In-active'}</span> the job status`,
        yes: value ? 'Yes! Active' : 'Yes! In-active',
        buttonClass: value ? 'actie-btn' : 'in-actie-btn',
      }
    }
    this.commonService.openDialog(obj, (res) => {
        callBack(res)
    })
  }

  getDisplayedColumns(): string[] {
    if (!this.commonService.checkNullOrUndefined(this.dataSource.data)) {
      return this.columnDefinitions.filter(cd => cd.hide).map(cd => cd.def);
    }
  }

  selectRow(row, index) {
    console.log(row, index)
  }

}
