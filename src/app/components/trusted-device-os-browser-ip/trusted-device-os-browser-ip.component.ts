import {
  Component,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';

import { ITrustedDevice } from '../../interfaces/trusted-device';


@Component({
  selector: 'fs-trusted-device-os-browser-ip',
  templateUrl: './trusted-device-os-browser-ip.component.html',
  styleUrls: [ './trusted-device-os-browser-ip.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsTrustedDeviceOsBrowserIpComponent {

  @Input() public trustedDevice: ITrustedDevice;
  @Input() public currentDevice = false;
}
