import { Component, OnInit, HostListener } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { environment } from '../../../environments/environment';
import { AuthenticationService } from 'src/app/auth/services/authentication.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  public userRoleId:any;
  public SERVER_PATH = environment.REST_API_URL;
  public customersInStore:number = 0;
  public OrdersCount:number = 0;
  public ProductsCount:number = 0;
  public SuitsCount:number = 0;
  public ShirtsCount:number = 0;
  public trousersCount:number = 0;
  public latestOrders:number = 0;
  public visits:any[];

  constructor(
    private commonService: CommonService,
    private authenticationService:AuthenticationService
    ) { }

  ngOnInit() {
    this.getDashboardDetails();
    this.userRoleId = this.authenticationService.getRoleId();
  }

  getDashboardDetails(){
    this.commonService.getDashboardDetails().subscribe(
      (res:any) => {
        this.customersInStore = res.data.customersInStore;
        this.OrdersCount = res.data.OrdersCount;
        this.ProductsCount = res.data.ProductsCount;
        this.SuitsCount = res.data.SuitsCount;
        this.ShirtsCount = res.data.ShirtsCount;
        this.trousersCount = res.data.trousersCount;
        this.latestOrders = res.data.latestOrders;
        // console.log(res.data.latestOrders);
        this.visits = res.data.visits;

      }
    )
  }


  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }

  compositeLineChartData1 = [{
    label: 'This week',
    data: [5,9,5,6,4,12,18,14,10,15,12,5,8,5,12,5,12,10,16,12],
    borderWidth: 2,
    fill: true
  }];

  compositeLineChartData2 = [{
    label: 'This week',
    data: [3,2,4,6,12,14,8,7,14,16,12,7,8,4,3,2,2,5,6,7],
    borderWidth: 2,
    fill: true
  }];

  compositeLineChartData3 = [{
    label: 'This week',
    data: [5,9,5,6,4,12,18,14,10,15,12,5,8,5,12,5,12,10,16,12],
    borderWidth: 2,
    fill: true
  }];

  compositeLineChartData4 = [{
    label: 'This week',
    data: [5,10,5,20,20,12,15,18,20,15,8,12,20,5,10,12,20,15,16,10],
    borderWidth: 2,
    fill: true
  }];

  compositeLineChartLabels = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'];

  compositeLineChartOptions = {
    scales: {
      yAxes: [{
        display: false,
        gridLines: {
          drawBorder: false,
          display: true,
          drawTicks: false,
        },
        ticks: {
          display: false,
          beginAtZero: true,
          min: 0,
          max: 20,
          stepSize: 10,
        }
      }],
      xAxes: [{
        display: false,
        position: 'bottom',
        gridLines: {
          drawBorder: false,
          display: false,
          drawTicks: false,
        },
        ticks: {
          beginAtZero: true,
          stepSize: 10,
          fontColor: "#a7afb7",
          padding: 10,
        }
      }],
    },
    legend: {
      display: false,
    },
    elements: {
      point: {
        radius: 0
      },
      line: {
        tension: 0
      }
    },
    tooltips: {
      backgroundColor: 'rgba(2, 171, 254, 1)',
    },
  };

  compositeLineChartColors = [
    {
      backgroundColor: [
        '#f9f9f9',
      ],
      borderColor: [
        '#cecece'
      ]
    }
  ];


  //  Years revenue chart
  yearsRevenueChartData = [{
    label: '# of Votes',
    data: [95, 75, 50, 75, 50, 80, 75],
    borderWidth: 1,
    fill: false
  },
  {
    label: '# of Rate',
    data: [70, 55, 40, 65, 40, 90, 65],
    borderWidth: 1,
    fill: false
  }];

  yearsRevenueChartLabels = ["Oct 01","","Oct 10","","Oct 20","","Oct 30"];

  yearsRevenueChartOptions = {
    scales: {
      yAxes: [{
        display: true,
        ticks: {
          beginAtZero:true,
          fontSize: 11,
          fontStyle: "bold",
          max: 100,
          stepSize: 25
        },
        gridLines: {
          drawBorder: false,
        }
      }],
      xAxes: [{
        barPercentage: .87,
        categoryPercentage: .6,
        gridLines: {
          color: 'rgba(0,0,0,0.08)',
          drawBorder: false,
          display: false,
        },
        ticks: {
          beginAtZero:true,
          fontSize: 11,
          fontStyle: "bold",
          display: true
        }
      }]

    },
    legend: {
      display: false
    },
    elements: {
      point: {
        radius: 0
      }
    }
  };

  yearsRevenueChartColors = [
    {
      backgroundColor: '#560bd0'
    },
    {
      backgroundColor: '#00cccc'
    }
  ];




  style = {
    sources: {
      world: {
        type: "geojson",
        data: "assets/world.geo.json"
      }
    },
    version: 8,
    layers: [
      {
        "id": "countries-fill",
        "type": "fill",
        "source": "world",
        "layout": {},
        "paint": {
          'fill-color': '#60adf8',
        },
      },
      {
        "id": "countries-border",
        "type": "line",
        "source": "world",
        "layout": {},
        "paint": {
          'line-color': '#ffffff',
        },
      }
    ]
  }

}
