import { Component, OnInit, ViewChild } from '@angular/core';

import { guid } from '@firestitch/common';
import { DeviceBrowser, DeviceOs, DeviceType } from '@firestitch/device';
import { FsTrustedDevicesComponent, ITrustedDevice, ITrustedDeviceAccount } from '@firestitch/trusted-devices';

import { of } from 'rxjs';
import { FsTrustedDevicesComponent as FsTrustedDevicesComponent_1 } from '../../../../src/app/components/trusted-devices/trusted-devices.component';
import { MatButton } from '@angular/material/button';
import { FsTrustedDeviceComponent } from '../../../../src/app/components/trusted-device/trusted-device.component';


@Component({
    selector: 'trusted-devices',
    templateUrl: './trusted-devices.component.html',
    styleUrls: ['./trusted-devices.component.scss'],
    standalone: true,
    imports: [
        FsTrustedDevicesComponent_1,
        MatButton,
        FsTrustedDeviceComponent,
    ],
})
export class TrustedDevicesComponent implements OnInit {

  @ViewChild(FsTrustedDevicesComponent)
  public trustedDevices: FsTrustedDevicesComponent;

  public trustedDevicesData: ITrustedDevice[] = null;

  public ngOnInit(): void {
    const activityDate = (new Date());
    activityDate.setHours((new Date()).getHours() - 1);

    this.trustedDevicesData = [
      {
        id: Math.random(),
        account: {
          id: Math.random(),
          name: 'John Doe',
          email: 'test@gmail.com',
          avatarUrl: 'https://randomuser.me/api/portraits/men/10.jpg',
        },
        device: {
          id: Math.random(),
          type: DeviceType.Desktop,
          osType: DeviceOs.Windows,
          osName: 'Windows',
          browserType: DeviceBrowser.Chrome,
          browserVersion: '1.0.0',
          browserName: 'Chrome',
          userAgent: 'Mozilla/5.0',
        },
        ip: { 'id':2135,'ip':'157.90.30.65','lat':51.2993,'lng':9.491,'country':'DE','region':'Kassel' },
        signinDate: new Date(),
        createDate: new Date(),
        activityDate,
        guid: guid(),
        state: 'active',
        currentDevice: true,
      },
      {
        id: Math.random(),
        account: {
          id: Math.random(),
          name: 'Jane Doe',
          email: 'test2@gmail.com',
          avatarUrl: 'https://randomuser.me/api/portraits/women/30.jpg',
        },
        device: {
          id: Math.random(),
          type: DeviceType.Mobile,
          osType: DeviceOs.Android,
          osName: 'Android',
          browserType: DeviceBrowser.Android,
          browserName: 'Android',
          browserVersion: '1.0.0',
          userAgent: 'Mozilla/5.0',
        },
        ip: { 'id':2135,'ip':'157.90.30.65','lat':51.2993,'lng':9.491,'country':'DE','region':'' },
        signinDate: new Date(),
        createDate: new Date(),
        guid: guid(),
        activityDate,
        state: 'active',
      },
    ];
  }

  public trustedDevicesFetch = (query) => {
    return of({
      data: this.trustedDevicesData,
    });
  };

  public trustedDeviceDelete = (data) => {
    console.log('Deleted', data);

    return of(data);
  };

  public trustedDeviceSignOut = (data) => {
    console.log('Sign Out', data);

    return of(data);
  };

  public signOutAll() {
    this.trustedDevices.signOutAll();
  }

  public deleteAll() {
    this.trustedDevices.deleteAll();
  }

  public accountClick(account: ITrustedDeviceAccount): void {
    console.log(account);
  }

}
