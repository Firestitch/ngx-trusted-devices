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

import { FsTrustedCurrentDeviceComponent } from './components/trusted-current-device/trusted-current-device.component';
import { FsTrustedDeviceDialogComponent, FsTrustedDeviceComponent, FsTrustedDevicesComponent } from './components';


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
