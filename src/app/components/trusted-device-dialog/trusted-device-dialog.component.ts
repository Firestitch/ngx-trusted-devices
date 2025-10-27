import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

import { MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';

import { FsMessage } from '@firestitch/message';
import { FsPrompt } from '@firestitch/prompt';

import { Observable, Subject } from 'rxjs';
import { filter, switchMap, takeUntil } from 'rxjs/operators';

import { trustedDeviceDelete } from '../../helpers';
import { ITrustedDevice } from '../../interfaces/trusted-device';
import { FsDialogModule } from '@firestitch/dialog';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { FsLabelModule } from '@firestitch/label';
import { FsDeviceModule } from '@firestitch/device';
import { FsIpModule } from '@firestitch/ip';
import { FsBadgeModule } from '@firestitch/badge';
import { MatButton } from '@angular/material/button';
import { FsDateModule } from '@firestitch/date';


@Component({
    templateUrl: './trusted-device-dialog.component.html',
    styleUrls: ['./trusted-device-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        FsDialogModule,
        MatDialogTitle,
        CdkScrollable,
        MatDialogContent,
        FsLabelModule,
        FsDeviceModule,
        FsIpModule,
        FsBadgeModule,
        MatDialogActions,
        MatButton,
        MatDialogClose,
        FsDateModule,
    ],
})
export class FsTrustedDeviceDialogComponent implements OnDestroy, OnInit {
  private _data = inject(MAT_DIALOG_DATA);
  private _prompt = inject(FsPrompt);
  private _message = inject(FsMessage);
  private _dialogRef = inject<MatDialogRef<FsTrustedDeviceDialogComponent>>(MatDialogRef);
  private _router = inject(Router);


  public trustedDevice: ITrustedDevice = null;
  public trustedDeviceDelete: (trustedDevice: ITrustedDevice) => Observable<any>;
  public trustedDeviceSignOut: (trustedDevice:  ITrustedDevice) => Observable<any>;

  private _destroy$ = new Subject();

  public ngOnInit(): void {
    this.trustedDevice = this._data.trustedDevice;
    this.trustedDeviceDelete = this._data.trustedDeviceDelete;
    this.trustedDeviceSignOut = this._data.trustedDeviceSignOut;

    this._router.events
      .pipe(
        filter((event) => event instanceof NavigationStart),
        takeUntil(this._destroy$),
      )
      .subscribe(() => {
        this.close();
      });
  }

  public delete(): void {
    this._prompt.confirm({
      title: 'Sign out & delete device',
      template: 'Are you sure you would like to delete this trusted device?',
    })
      .pipe(
        switchMap(() => trustedDeviceDelete(this.trustedDevice, this.trustedDeviceDelete, this.trustedDeviceSignOut)),
        takeUntil(this._destroy$),
      )
      .subscribe(() => {
        this._message.success('Deleted trusted device');
        this.close();
      });
  }

  public signOut(): void {
    this.trustedDeviceSignOut(this.trustedDevice)
      .subscribe(() => {
        this.close();
      });
  }

  public close(): void {
    this._dialogRef.close(true);
  }

  public ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.complete();
  }

}
