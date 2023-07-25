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

import { from, Observable, of, Subject, throwError } from 'rxjs';
import { concatMap, finalize, map, switchMap, takeUntil, tap } from 'rxjs/operators';

import { ITrustedDevice } from '../../interfaces/trusted-device';
import { ITrustedDeviceAccount } from '../../interfaces/trusted-device-account';
import { FsTrustedDeviceDialogComponent } from '../trusted-device-dialog';
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

    dialogRef
    .afterClosed()
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe(() => this.listComponent.reload());
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public signOutAll(): Observable<any> {
    const observable$ = new Subject();

    this._signoutPrompt(true)
      .pipe(
        switchMap(()=> {
          const trustedDevices$ = this.listComponent.getData()
            .filter((trustedDevice) => !trustedDevice.currentDevice)
            .map((trustedDevice) => this.trustedDeviceSignOut(trustedDevice));

          return trustedDevices$.length ? from(trustedDevices$) : throwError('There are no trusted devices to signout of');
        }),
        concatMap((req) => req),
        finalize(() => this._message.success('Signed out all active sessions')),
        takeUntil(this._destroy$),
      )
        .subscribe({
          next: () => {
            observable$.next();
            observable$.complete();
          },
          error: (error) => observable$.error(error)
        });

    return observable$    
      .pipe(
        takeUntil(this._destroy$),
      );
  }

  public deleteAll(): Observable<any> {
    const observable$ = new Subject();
    this._prompt.confirm({
      title: 'Sign Out & Delete All',
      template: `This will sign out all active sessions, excluding your current session, and remove all trusted devices permanently. 2-Step Verification will be required again.`,
      commitLabel: 'Sign Out & Delete'
    })
      .pipe(
        switchMap(() => {
          const trustedDevices$ = this.listComponent.getData()
            .map((trustedDevice) => trustedDeviceDelete(trustedDevice, this.trustedDeviceDelete, this.trustedDeviceSignOut));
          
          return trustedDevices$.length ? from(trustedDevices$) : throwError('There are no trusted devices to delete');
        }),
        concatMap((req) => req),
        takeUntil(this._destroy$),
      )
      .subscribe({
        next: () => {
          this._message.success('Deleted all trusted devices');
          this.listComponent.reload();

          observable$.next();
          observable$.complete();
        },
        error: (error) => observable$.error(error),
      });

    return observable$
      .pipe(
        takeUntil(this._destroy$),
      );
  }

  private _signoutPrompt(all): Observable<any> {
    return this._prompt.confirm({
      title: all ? 'Sign Out All' : 'Sign Out',
      template: all ?
       'This will sign out all active sessions, excluding your current session. 2-Step Verification will be required again.'
       : 'This will sign out all active sessions. 2-Step Verification will be required again.',
      commitLabel: 'Sign Out'
    })
  }

  private _initListConfig(): void {
    this.listConfig = {
      paging: false,
      rowActions: [
        {
          click: (data) => {
            this._signoutPrompt(false)
              .pipe(
                switchMap(() => this.trustedDeviceSignOut(data))
              )
              .subscribe();
          },
          show: (trustedDevice) => {
            return !trustedDevice.currentDevice;
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
            title: 'Sign Out & Delete',
            template: 'This will sign out all active sessions, excluding your current session, and remove the trusted devices permanently. 2-Step Verification may be required again.',
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
