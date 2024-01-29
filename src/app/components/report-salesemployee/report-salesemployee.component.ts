import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FormControl } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-report-salesemployee',
  templateUrl: './report-salesemployee.component.html',
  styleUrls: ['./report-salesemployee.component.css']
})
export class ReportSalesemployeeComponent implements OnInit {

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  public REST_API_SERVER: string = `${environment.REST_API_URL}/api/${environment.version}`;

  // dtOptions: DataTables.Settings = {};
  dtOptions: any = {};

  timelineFilterOptions = [
    { value: 'all', label: 'All' },
    { value: 'today', label: 'Today' },
    { value: 'yesterday', label: 'Yesterday' },
    { value: 'thisMonth', label: 'This month' },
    { value: 'lastMonth', label: 'Last month' },
    { value: 'thisYear', label: 'This year' },
    { value: 'lastYear', label: 'Last year' },
    { value: 'custom', label: 'Custom date' },
  ];
  selectedTimelineFilter: string = 'all';
  startDate: Date;
  endDate: Date;

  orderStatusFilterOptions: any[] = [
    { value: -1, label: 'All' },
    { value: 0, label: 'Order Placed' },
    { value: 1, label: 'Order Completed' },
    { value: 2, label: 'Order Cancelled' },
  ];
  orderStatusSelectedFilter: string = '';
  public salesEmployeeList: any;
  public searchSelectedEmployees: any;
  filteredSalesEmployeeList: any[] = [];
  searchCtrl: FormControl = new FormControl();
  selectedEmployee: any = 0;
  constructor(
    private http: HttpClient,
    private productService:ProductService,
    ) {}

  ngOnInit(): void {
    this.orderStatusSelectedFilter = this.orderStatusFilterOptions[0].value;

    const that = this;
    let resp: any = {}; // Initialize resp with an empty object or provide a proper type
    this.dtOptions = {
      serverSide: true,
      // Set the flag

      ajax: (dataTablesParameters: any, callback) => {
        that.http
          .post<any>(
            this.REST_API_SERVER + '/report-sales-employee-json',
            {
              ...dataTablesParameters,
              sales_employee: this.selectedEmployee,
              timeline: this.selectedTimelineFilter,
              start_date: this.startDate,
              end_date: this.endDate,
            },
            // dataTablesParameters,
            {}
          )
          .subscribe((response) => {
            resp = response || {}; // Assign the response to resp, ensuring it's not null or undefined

            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: resp.data,
            });
          });
      },
      columns: [
        {
          title: 'ORDER ID',
          data: 'order_id',
          orderable: false,
          render: function (data: any, type: any, row: any, meta: any) {
            let orderId = 'PCO0' + data;
            return `<a href="./order-view/${data}">${orderId}</a>`;
          },
        },
        {
          title: 'INVOICE NO',
          data: 'invoice_number',
          orderable: false,
          render: function (data: any, type: any, row: any, meta: any) {
            if (data)
              return 'PCI-' + data;
            else
              return '';
          },
        },

        {
          title: 'CUSTOMER NAME',
          data: 'customer_name',
          orderable: false,
        },

        {
          title: 'PRODUCT NAME',
          data: 'product_name',
          orderable: false,
        },
        {
          title: 'PRODUCT PRICE',
          data: 'product_price',
          orderable: false,
        },
        {
          title: 'SALES EMP NAME',
          data: 'sales_emp_name',
          orderable: false,
        },

        {
          title: 'ORDER PLACED',
          data: 'order_created',
          orderable: false,
          render: function (data: any, type: any, row: any, meta: any) {
            // Assuming data is in the format '2023-11-15 06:34:59'
            const dateObject = new Date(data);
            const formattedDate = dateObject.toLocaleString('en-GB', {
              day: 'numeric',
              month: 'numeric',
              year: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
              hour12: true, // Use 12-hour format
            });
            return formattedDate;
          },
        },

      ],
      order: [],
      dom: 'Blfrtip',
      lengthMenu: [
        [50, 100, 250, 500, -1],
        ['50', '100', '250', '500', 'All'],
      ],
      buttons: ['colvis', 'excel'],

    };

    this.getSalesEmployeeList();
  }

  onDateChange() {
    $('#dataTable').DataTable().ajax.reload();
  }

  onSalesEmployee() {
    $('#dataTable').DataTable().ajax.reload();
  }

  onTimelineFilterChange() {
    if (this.selectedTimelineFilter === 'custom') {
      this.startDate = null;
      this.endDate = null;
    } else {
      $('#dataTable').DataTable().ajax.reload();
    }
  }

  getSalesEmployeeList() {

    this.productService.getSaleEmployees().subscribe(
      (res) => {
        console.log(res)
        this.salesEmployeeList = res;
        this.searchSelectedEmployees = this.salesEmployeeList;
        this.filteredSalesEmployeeList = this.salesEmployeeList.slice(); // Initial copy

      },
      (err) => {
        console.log('Error Sales Employee', err)
      }
    )
  }

  onSearchEmpKey(value) {
    this.searchSelectedEmployees = this.searchSaleEmp(value);
  }

  searchSaleEmp(value: string) {
    const filterValue = value.toLowerCase();
    return this.salesEmployeeList.filter((saleEmp) =>
      `${saleEmp.name} - ${saleEmp.employe_code}`.toLowerCase().includes(filterValue)
    );
  }

  updateSalesEmployee(event:any)
  {
    this.selectedEmployee = event.value;
    $('#dataTable').DataTable().ajax.reload();
  }

}
