import { Observable, of } from 'rxjs';
import { switchMap } from "rxjs/operators";
import { ITrustedDevice } from '../interfaces';

export function trustedDeviceDelete(
  trustedDevice: ITrustedDevice, 
  delete$: (trustedDevice: ITrustedDevice) => Observable<any>,
  signout$: (trustedDevice: ITrustedDevice) => Observable<any>
  ): Observable<any> {
    return of(true)
      .pipe(
        switchMap(() => trustedDevice.currentDevice ? of(true) : signout$(trustedDevice)),
        switchMap(() => delete$(trustedDevice)),
      );
}