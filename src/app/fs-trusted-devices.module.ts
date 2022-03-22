import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';

import { FsListModule } from '@firestitch/list';
import { FsDateModule } from '@firestitch/date';
import { FsCountryModule } from '@firestitch/country';
import { FsDeviceModule } from '@firestitch/device';
import { FsIpModule } from '@firestitch/ip';
import { FsBadgeModule } from '@firestitch/badge';

import { FsTrustedDevicesComponent } from './components/trusted-devices/trusted-devices.component';
import { FsTrustedCurrentDeviceComponent } from './components/trusted-current-device/trusted-current-device.component';


@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,

    MatIconModule,
    MatTooltipModule,

    FsListModule,
    FsDateModule,
    FsCountryModule,
    FsDeviceModule,
    FsBadgeModule,
    FsIpModule,
  ],
  exports: [
    FsTrustedDevicesComponent,
    FsTrustedCurrentDeviceComponent,
  ],
  declarations: [
    FsTrustedDevicesComponent,
    FsTrustedCurrentDeviceComponent,
  ],
})
export class FsTrustedDevicesModule {
}
