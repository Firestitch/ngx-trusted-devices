import {
  Component,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';

import { ITrustedDevice } from '../../interfaces/trusted-device';


@Component({
  selector: 'fs-trusted-device',
  templateUrl: './trusted-device.component.html',
  styleUrls: [ './trusted-device.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsTrustedDeviceComponent {

  @Input() public trustedDevice: ITrustedDevice;
  @Input() public currentDevice = false;
}
