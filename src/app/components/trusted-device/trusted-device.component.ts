import {
  Component,
  Inject,
  ChangeDetectionStrategy,
  OnDestroy,
} from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { FsPrompt } from '@firestitch/prompt';
import { FsMessage } from '@firestitch/message';

import { Observable, Subject } from 'rxjs';
import { takeUntil, switchMap } from 'rxjs/operators';

import { ITrustedDevice } from '../../interfaces/trusted-device';


@Component({
  templateUrl: './trusted-device.component.html',
  styleUrls: [ './trusted-device.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsTrustedDeviceComponent implements OnDestroy {

  public trustedDevice: ITrustedDevice = null;

  public trustedDeviceDelete: (trustedDevice: ITrustedDevice) => Observable<any>;

  public trustedDeviceSignOut: (trustedDevice:  ITrustedDevice) => Observable<any>;

  private _destroy$ = new Subject();

  constructor(
    @Inject(MAT_DIALOG_DATA) private _data: {
      trustedDevice: ITrustedDevice;
      trustedDeviceDelete: (trustedDevice: ITrustedDevice) => Observable<any>;
      trustedDeviceSignOut: (trustedDevice:  ITrustedDevice) => Observable<any>;
    },
    private _fsPrompt: FsPrompt,
    private _fsMessage: FsMessage,
    private _dialogRef: MatDialogRef<FsTrustedDeviceComponent>,
  ) {
    this.trustedDevice = this._data.trustedDevice;
    this.trustedDeviceDelete = this._data.trustedDeviceDelete;
    this.trustedDeviceSignOut = this._data.trustedDeviceSignOut;
  }

  public delete(): void {
    this._fsPrompt.confirm({
      title: 'Confirm',
      template: 'Are you sure you would like to delete this record?',
    })
      .pipe(
        switchMap(() => this.trustedDeviceDelete(this.trustedDevice)),
        takeUntil(this._destroy$),
      )
      .subscribe(() => {
        this._fsMessage.success('Deleted trusted device');
        this._dialogRef.close(true);
      });
  }

  public signOut(): void {
    this.trustedDeviceSignOut(this.trustedDevice)
      .subscribe(() => {
        this._dialogRef.close(true);
      });
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

}
