import { Component, OnInit, ViewChild } from '@angular/core';

import { FsTrustedDevicesComponent, ITrustedDevice, ITrustedDeviceAccount } from '@firestitch/trusted-devices';
import { DeviceType, DeviceBrowser, DeviceOs } from '@firestitch/device';
import { guid } from '@firestitch/common';

import { of } from 'rxjs';


@Component({
  selector: 'trusted-devices',
  templateUrl: './trusted-devices.component.html',
  styleUrls: ['./trusted-devices.component.scss']
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
        ip: {"id":2135,"ip":"157.90.30.65","lat":51.2993,"lng":9.491,"country":"DE","region":"Kassel"},
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
        ip: {"id":2135,"ip":"157.90.30.65","lat":51.2993,"lng":9.491,"country":"DE","region":""},
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
  }

  public trustedDeviceDelete = (data) => {
    console.log('Deleted', data);
    return of(data);
  }

  public trustedDeviceSignOut = (data) => {
    console.log('Sign Out', data);
    return of(data);
  }

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
