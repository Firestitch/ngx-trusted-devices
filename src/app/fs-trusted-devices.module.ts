import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { FsListModule } from '@firestitch/list';
import { FsDateModule } from '@firestitch/date';
import { FsCountryModule } from '@firestitch/country';
import { FsDeviceModule } from '@firestitch/device';
import { FsIpModule } from '@firestitch/ip';
import { FsBadgeModule } from '@firestitch/badge';
import { FsDialogModule } from '@firestitch/dialog';
import { FsLabelModule } from '@firestitch/label';

import { FsTrustedDevicesComponent } from './components/trusted-devices/trusted-devices.component';
import { FsTrustedCurrentDeviceComponent } from './components/trusted-current-device/trusted-current-device.component';
import { FsTrustedDeviceComponent } from './components/trusted-device/trusted-device.component';
import { FsTrustedDeviceOsBrowserIpComponent } from './components/trusted-device-os-browser-ip/trusted-device-os-browser-ip.component';


@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,

    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    MatButtonModule,

    FsListModule,
    FsDateModule,
    FsCountryModule,
    FsDeviceModule,
    FsBadgeModule,
    FsIpModule,
    FsDialogModule,
    FsLabelModule,
  ],
  exports: [
    FsTrustedDevicesComponent,
    FsTrustedCurrentDeviceComponent,
    FsTrustedDeviceOsBrowserIpComponent,
  ],
  declarations: [
    FsTrustedDevicesComponent,
    FsTrustedCurrentDeviceComponent,
    FsTrustedDeviceComponent,
    FsTrustedDeviceOsBrowserIpComponent,
  ],
})
export class FsTrustedDevicesModule {
}
