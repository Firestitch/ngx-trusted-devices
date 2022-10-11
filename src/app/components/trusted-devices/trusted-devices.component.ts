import {
  Component,
  ViewChild,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
} from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { FsListComponent, FsListConfig } from '@firestitch/list';
import { FsMessage } from '@firestitch/message';

import { Observable, Subject } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { ITrustedDevice } from '../../interfaces/trusted-device';
import { ITrustedDeviceAccount } from '../../interfaces/trusted-device-account';
import { FsTrustedDeviceComponent } from '../trusted-device/trusted-device.component';
import { FsPrompt } from '@firestitch/prompt';



@Component({
  selector: 'fs-trusted-devices',
  templateUrl: './trusted-devices.component.html',
  styleUrls: [ './trusted-devices.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsTrustedDevicesComponent implements OnInit, OnDestroy {

  @Input()
  public trustedDevicesFetch: (query: any) => Observable<{
    data: ITrustedDevice[];
    paging?: any;
  }>;

  @Input()
  public showAccount = true;

  @Input()
  public trustedDeviceDelete: (trustedDevice: ITrustedDevice) => Observable<any>;

  @Input()
  public trustedDeviceSignOut: (trustedDevice:  ITrustedDevice) => Observable<any>;

  @Output()
  public accountClick: EventEmitter<ITrustedDeviceAccount> = new EventEmitter< ITrustedDeviceAccount>();

  @ViewChild(FsListComponent)
  public listComponent: FsListComponent;

  public listConfig: FsListConfig;

  private _destroy$ = new Subject();

  public constructor(
    private _message: FsMessage,
    private _prompt: FsPrompt,
    private _dialog: MatDialog,
  ) { }

  public ngOnInit(): void {
    this._initListConfig();
  }

  public accountClicked(account: ITrustedDeviceAccount): void {
    this.accountClick.emit(account);
  }

  public openTrustedDeviceDialog(trustedDevice: ITrustedDevice): void {
    const dialogRef = this._dialog.open(FsTrustedDeviceComponent, {
      data: {
        trustedDevice,
        trustedDeviceDelete: this.trustedDeviceDelete,
        trustedDeviceSignOut: this.trustedDeviceSignOut,
      },
    });

    dialogRef.afterClosed()
      .subscribe(() => this.listComponent.reload());
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  private _initListConfig(): void {
    this.listConfig = {
      rowActions: [
        {
          click: (data) => {
            this._prompt.confirm({
              title: 'Sign Out Device',
              template: 'This will remove access to your account for the signed in device',
              commitLabel: 'Sign Out'
            })
              .pipe(
                switchMap(() => this.trustedDeviceSignOut(data))
              )
              .subscribe();
          },
          menu: true,
          label: 'Sign Out',
        },
        {
          click: (data) => {
            return this.trustedDeviceDelete(data)
            .pipe(
              tap(() => {
                this._message.success('Deleted trusted device');
              }),
            )
          },
          remove: {
            title: 'Confirm',
            template: 'Are you sure you would like to delete this trusted device?',
          },
          menu: true,
          label: 'Delete',
        },
      ],
      fetch: (query) => {
        return this.trustedDevicesFetch(query)
          .pipe(
            tap((response) => {
              const show = response.data.some((row) => {
                return !!row.account;
              });

              this.listComponent.columnVisibility('account', show);
            }),
            map((response) => {
              return {
                data: response.data,
                paging: response.paging,
              };
            }),
          );
      },
    };
  }

}
