import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Observable, Subject } from 'rxjs';

import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { WebcamService } from '../../services/webcam.service';
import { CommonService } from '../../services/common.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';


@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent implements OnInit {
  cartId: any;

  // toggle webcam on/off
  public showWebcam = true;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public deviceId!: string;
  public errors: WebcamInitError[] = [];
  public commentInput;

  // latest snapshot
  public webcamImage!: WebcamImage;

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  private nextWebcam: Subject<boolean | string> = new Subject<
    boolean | string
  >();

  constructor(
    private WebcamService: WebcamService,
    private commonService: CommonService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
  ) { }

  // Check if multiple camera devices available
  public ngOnInit(): void {
    this.cartId = this.route.snapshot.paramMap.get('cartId');
    WebcamUtil.getAvailableVideoInputs().then(
      (mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      }
    );
  }

  // Capture Image
  public takeSnapshot(): void {
    this.trigger.next();
  }

  // ON OFF Camera
  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
  }

  // Switch to next camera device if avaiable
  public showNextWebcam(directionOrDeviceId: boolean | string): void {
    this.nextWebcam.next(directionOrDeviceId);
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  public takePicture(webcammmImage: WebcamImage): void {
    console.info('received webcam image', webcammmImage);
    this.webcamImage = webcammmImage;
  }

  public cameraWasSwitched(deviceId: string): void {
    console.log('active device: ' + deviceId);
    this.deviceId = deviceId;
  }

  public get initObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean | string> {
    return this.nextWebcam.asObservable();
  }

  form: any = {
    comment: null,

    // src    :null,
  };

  onSubmit(): void {
    const comment = this.form;
    // const src     = this.form;
    //set value

    // console.log(comment);
    this.WebcamService.storeSrc(comment).subscribe({
      next: data => {
        console.log(data);

        if (data.success == false) {
          this.commonService.openAlert(data.message);
          this.router.navigate(['/cart']);
        } else {
          this.commonService.openAlert(data.message);
          // this.router.navigate(['/cart']);
        }

      },
      error: err => {

      }

    });

  }

  //  cartId?:any;


  sendImage(cartId:any) {

    const params = {
      image: this.webcamImage.imageAsBase64,
      comment: this.commentInput,
      cartId: this.cartId

    }
    // console.log(params);return;
    this.WebcamService.storeSrc(params).subscribe({
      next: data => {
        // console.log(data);return;
          this.commonService.openAlert(data.message);
          this.router.navigate(['/cart']);

      },
      error: err => {
      }
    });
  }

  goBack(): void {
    this.location.back();
  }
}

