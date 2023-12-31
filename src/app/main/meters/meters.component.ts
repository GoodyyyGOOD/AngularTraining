import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { MeterService } from 'app/common/services/meter.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-meters',
  templateUrl: './meters.component.html',
  styleUrls: ['./meters.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MetersComponent implements OnInit {

  public contentHeader: object;
  public ColumnMode = ColumnMode;
  public SelectionType = SelectionType;
  public rows = [];
  private unsubscribeAll: Subject<any>;
  public page = {
    pageNumber: 0,
    size: 10,
    totalCount: undefined,
    search: null
  };
  @BlockUI() blockUI: NgBlockUI;

  constructor(private meterService: MeterService) { 
    this.unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.contentHeader = {
      headerTitle: 'Meters',
      actionButton: false,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Meters',
            isLink: false
          },
        ]
      }
    }
    this.setPage({ offset: 0 });
  }
  setPage(pageInfo): void {
    this.blockUI.start();
    console.log('pageInfo', pageInfo);
    this.page.pageNumber = pageInfo.offset;
    this.meterService.getMeters(this.page.search,this.page.pageNumber + 1, this.page.size)
    .pipe(takeUntil(this.unsubscribeAll)).subscribe((response: any) => {
      // success
      const { data, page, totalCount } = response;
      this.rows = data;
      this.page.pageNumber = page - 1;
      this.page.totalCount = totalCount;
      this.blockUI.stop();
    }, () => {
      // error
      this.blockUI.stop();
    })
  }
  filterCustomers(event){
    console.log(event.target.value);
    this.page.search = event.target.value;
    this.setPage({offset: 0})
  }

  onDeleteMeter(row){
    console.log('row',row)
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#7367F0',
      cancelButtonColor: '#E42728',
      confirmButtonText: 'Yes, delete it!',
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-danger ml-1'
      }
    }).then((result) => {
      this.blockUI.start();
      this.meterService.deleteMeter(row.id).pipe(takeUntil(this.unsubscribeAll)).subscribe(response => {
        this.setPage({offset:0})
        Swal.fire({
          title: 'Great!',
          text: 'Customer has been deleted.',
          icon: 'success',
          confirmButtonColor: '#7367F0',
          confirmButtonText: 'Ok',
          customClass: {
            confirmButton: 'btn btn-primary'
          }
        });
        this.blockUI.stop();
      }, () => {
        this.blockUI.stop();
      });
    });
  }

}
