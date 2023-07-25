import {
  Component,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';


@Component({
  selector: 'fs-trusted-current-device',
  templateUrl: './trusted-current-device.component.html',
  styleUrls: [ './trusted-current-device.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsTrustedCurrentDeviceComponent {

  @Input() public tooltip = true;
}
