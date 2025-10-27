import { Component } from '@angular/core';
import { environment } from '@env';
import { FsExampleModule } from '@firestitch/example';
import { TrustedDevicesComponent } from '../trusted-devices/trusted-devices.component';


@Component({
    templateUrl: 'examples.component.html',
    standalone: true,
    imports: [FsExampleModule, TrustedDevicesComponent]
})
export class ExamplesComponent {
  public config = environment;
}
