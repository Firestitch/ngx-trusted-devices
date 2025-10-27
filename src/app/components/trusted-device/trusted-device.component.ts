import {
  Component,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';

import { ITrustedDevice } from '../../interfaces/trusted-device';
import { FsDeviceModule } from '@firestitch/device';
import { FsCountryModule } from '@firestitch/country';
import { MatTooltip } from '@angular/material/tooltip';
import { FsTrustedCurrentDeviceComponent } from '../trusted-current-device/trusted-current-device.component';
import { FsDateModule } from '@firestitch/date';


@Component({
    selector: 'fs-trusted-device',
    templateUrl: './trusted-device.component.html',
    styleUrls: ['./trusted-device.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        FsDeviceModule,
        FsCountryModule,
        MatTooltip,
        FsTrustedCurrentDeviceComponent,
        FsDateModule,
    ],
})
export class FsTrustedDeviceComponent {

  @Input() public trustedDevice: ITrustedDevice;
  @Input() public currentDevice = false;
}
