import { NgModule, ModuleWithProviders, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatIconModule } from '@angular/material/icon';

import { FsListModule } from '@firestitch/list';
import { FsDateModule } from '@firestitch/date';
import { FsCountryModule } from '@firestitch/country';
import { FsDeviceModule } from '@firestitch/device';
import { FsBadgeModule } from '@firestitch/badge';

import { FsTrustedDevicesComponent } from './components/trusted-devices/trusted-devices.component';


@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,

    MatIconModule,

    FsListModule,
    FsDateModule,
    FsCountryModule,
    FsDeviceModule,
    FsBadgeModule,
  ],
  exports: [
    FsTrustedDevicesComponent,
  ],
  declarations: [
    FsTrustedDevicesComponent,
  ],
  providers: [],
})
export class FsTrustedDevicesModule {
  // static forRoot(): ModuleWithProviders<FsTrustedDevicesModule> {
  //   return {
  //     ngModule: FsTrustedDevicesModule,
  //     providers: [FsDeviceModule.forRoot().providers]
  //   };
  // }
}
