import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { FsBadgeModule } from '@firestitch/badge';
import { FsCountryModule } from '@firestitch/country';
import { FsDateModule } from '@firestitch/date';
import { FsDeviceModule } from '@firestitch/device';
import { FsDialogModule } from '@firestitch/dialog';
import { FsIpModule } from '@firestitch/ip';
import { FsLabelModule } from '@firestitch/label';
import { FsListModule } from '@firestitch/list';

import { FsTrustedDeviceComponent, FsTrustedDeviceDialogComponent, FsTrustedDevicesComponent } from './components';
import { FsTrustedCurrentDeviceComponent } from './components/trusted-current-device/trusted-current-device.component';


@NgModule({
  imports: [
    CommonModule,

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
    FsTrustedDeviceComponent,
  ],
  declarations: [
    FsTrustedDevicesComponent,
    FsTrustedCurrentDeviceComponent,
    FsTrustedDeviceDialogComponent,
    FsTrustedDeviceComponent,
  ],
})
export class FsTrustedDevicesModule {
}
