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
import { FsPrompt } from '@firestitch/prompt';
import { FsMessage } from '@firestitch/message';

import { from, Observable, Subject } from 'rxjs';
import { concatMap, finalize, map, switchMap, takeUntil, takeWhile, tap } from 'rxjs/operators';

import { ITrustedDevice } from '../../interfaces/trusted-device';
import { ITrustedDeviceAccount } from '../../interfaces/trusted-device-account';
import { FsTrustedDeviceDialogComponent } from '../trusted-device-dialog/trusted-device-dialog.component';
import { trustedDeviceDelete } from '../../helpers';


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

  @Input() public showAccount = true;
  @Input() public trustedDeviceDelete: (trustedDevice: ITrustedDevice) => Observable<any>;
  @Input() public trustedDeviceSignOut: (trustedDevice:  ITrustedDevice) => Observable<any>;

  @Output() public accountClick: EventEmitter<ITrustedDeviceAccount> = new EventEmitter< ITrustedDeviceAccount>();

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
    const dialogRef = this._dialog.open(FsTrustedDeviceDialogComponent, {
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

  public signOutAll(): void {
    const trustedDevices$ = this.listComponent.getData()
        .map((trustedDevice) => this.trustedDeviceSignOut(trustedDevice));

    if(trustedDevices$.length) {
      this._signoutPrompt(true)
      .pipe(
        switchMap(()=>from(trustedDevices$)),
        concatMap((req) => req),
        takeUntil(this._destroy$),
      )
        .subscribe(() => {
          this._message.success('Signed out all trusted devices')
        });
    }
  }

  public deleteAll(): void {
    const trustedDevices$ = this.listComponent.getData()
      .map((trustedDevice) => trustedDeviceDelete(trustedDevice, this.trustedDeviceDelete, this.trustedDeviceSignOut));

    if(trustedDevices$) {
      this._deletePrompt()
      .pipe(
        switchMap(() => from(trustedDevices$)),
        concatMap((req) => req),
        takeUntil(this._destroy$),
      ).subscribe(() => {
        this._message.success('Deleted all trusted devices');
        this.listComponent.reload();
      });
    }
  }

  private _signoutPrompt(all): Observable<any> {
    return this._prompt.confirm({
      title: all ? 'Sign Out All Devices' : 'Sign Out Device',
      template: `This will remove account access for any signed in ${all ? 'devices' : 'device'}`,
      commitLabel: 'Sign Out'
    })
  }

  private _deletePrompt(): Observable<any> {
    return this._prompt.confirm({
      title: 'Sign Out & Delete All Devices',
      template: `This will remove account access for any signed in devices and remove the trusted device permanently`,
      commitLabel: 'Delete'
    })
  }

  private _initListConfig(): void {
    this.listConfig = {
      rowActions: [
        {
          click: (data) => {
            this._signoutPrompt(false)
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
            return trustedDeviceDelete(data, this.trustedDeviceDelete, this.trustedDeviceSignOut)
              .pipe(
                tap(() => {
                  this._message.success('Deleted trusted device');
                }),
            )
          },
          remove: {
            title: 'Sign Out & Delete Device',
            template: 'This will remove account access for any signed in devices and remove the trusted device permanently',
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
