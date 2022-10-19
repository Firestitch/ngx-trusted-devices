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
import { trustedDeviceDelete } from '../../helpers';


@Component({
  templateUrl: './trusted-device-dialog.component.html',
  styleUrls: [ './trusted-device-dialog.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsTrustedDeviceDialogComponent implements OnDestroy {

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
    private _prompt: FsPrompt,
    private _message: FsMessage,
    private _dialogRef: MatDialogRef<FsTrustedDeviceDialogComponent>,
  ) {
    this.trustedDevice = this._data.trustedDevice;
    this.trustedDeviceDelete = this._data.trustedDeviceDelete;
    this.trustedDeviceSignOut = this._data.trustedDeviceSignOut;
  }

  public delete(): void {
    this._prompt.confirm({
      title: 'Sign Out & Delete Device',
      template: 'Are you sure you would like to delete this trusted device?',
    })
      .pipe(
        switchMap(() => trustedDeviceDelete(this.trustedDevice, this.trustedDeviceDelete, this.trustedDeviceSignOut)),
        takeUntil(this._destroy$),
      )
      .subscribe(() => {
        this._message.success('Deleted trusted device');
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
