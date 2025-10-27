import {
  Component,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';


@Component({
    selector: 'fs-trusted-current-device',
    templateUrl: './trusted-current-device.component.html',
    styleUrls: ['./trusted-current-device.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [MatIcon, MatTooltip],
})
export class FsTrustedCurrentDeviceComponent {

  @Input() public tooltip = true;
}
