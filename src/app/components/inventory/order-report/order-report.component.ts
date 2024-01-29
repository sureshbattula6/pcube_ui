import { Component, OnInit, ViewChild  } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-order-report',
  templateUrl: './order-report.component.html',
  styleUrls: ['./order-report.component.css'],
})
export class OrderReportComponent implements OnInit {

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  public REST_API_SERVER:string = `${environment.REST_API_URL}/api/${environment.version}`;

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
  orderStatusSelectedFilter: string = ''; // The selected value from the dropdown
  constructor(private http: HttpClient) {} // Inject HttpClient

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
            this.REST_API_SERVER + '/order-report-json',
            {
              ...dataTablesParameters,
              order_status: this.orderStatusSelectedFilter,
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
            let orderId = 'PC0' + data;
            return `<a href="./order-view/${data}">${orderId}</a>`;
          },
        },
        {
          title: 'CUSTOMER NAME',
          data: 'customer_name',
          orderable: false,
        },
        {
          title: 'PHONE',
          data: 'customer_phone',
          orderable: false,
        },
        {
          title: 'TOT. QTY',
          data: 'total_quantities',
          orderable: false,
        },
        {
          title: 'AMOUNT',
          data: 'order_amount',
          orderable: false,
        },
        {
          title: 'PAID AMOUNT',
          data: 'total_paid_amount',
          orderable: false,
          render: function(data, type, row, meta) {
            if (row.total_paid_amount === null) {
                return '0.00';
            } else {
                return row.total_paid_amount;
            }
          }
        },
        {
          title: 'DISCOUNT',
          data: 'order_discount',
          orderable: false,
        },
        {
          title: 'BALANCE',
          data: null,
          orderable: false,
          render: function (data: any, type: any, row: any, meta: any) {
            let balance =
              row.order_amount - row.total_paid_amount - row.order_discount;
            if (balance < 0) balance = 0;
            return balance.toFixed(2); // Adjust the precision as needed
          },
        },
        {
          title: 'STATUS',
          data: 'table_order_status',
          render: function (data: any, type: any, row: any, meta: any) {
            switch (data) {
              case 0:
                return 'Order Placed';
              case 1:
                return 'Order Completed';
              case 2:
                return 'Order Cancelled';
              default:
                return 'Unknown';
            }
          },
          orderable: false,
        },
      ],
      order: [],
      dom: 'Blfrtip',
      lengthMenu: [
        [50, 100,  -1],
        ['50','100', 'All'],
      ],
      buttons: ['colvis', 'excel'],
      footerCallback: (tfoot, data, start, end, display) => {

        this.dtElement.dtInstance.then((api: DataTables.Api) => {

          let totalQty = api.column(3).data().reduce((a, b) => Number(a) + Number(b), 0);
          let totalAmount = api.column(4).data().reduce((a, b) => Number(a) + Number(b), 0);
          let totalPaid = api.column(5).data().reduce((a, b) => Number(a) + Number(b), 0);
          let totalDisc = api.column(6).data().reduce((a, b) => Number(a) + Number(b), 0);
          let totalBalance = api.column(7).data().reduce((a, b) => Number(a) + Number(b), 0);

          $('#dataTable tfoot th').eq(1).html('Total: ');
          $('#dataTable tfoot th').eq(3).html(totalQty);
          $('#dataTable tfoot th').eq(4).html(totalAmount);
          $('#dataTable tfoot th').eq(5).html(totalPaid);
          $('#dataTable tfoot th').eq(6).html(totalDisc.toFixed(2));
          $('#dataTable tfoot th').eq(8).html(totalBalance);

         });

      }

    };
  }

  onOrderStatusFilterChange() {
    $('#dataTable').DataTable().ajax.reload();
  }

  onDateChange() {
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
}
