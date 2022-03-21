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

import { FsListComponent, FsListConfig } from '@firestitch/list';
import { ItemType } from '@firestitch/filter';

import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { ITrustedDevice } from '../../interfaces/trusted-device';
import { ITrustedDeviceAccount } from '../../interfaces/trusted-device-account';
import { FsMessage } from '@firestitch/message';


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
  ) {}

  public ngOnInit(): void {
    this._initListConfig();
  }

  public accountClicked(account: ITrustedDeviceAccount): void {
    this.accountClick.emit(account);
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  private _initListConfig(): void {
    this.listConfig = {
      filters: [
        {
          name: 'keyword',
          type: ItemType.Keyword,
          label: 'Search',
        },
      ],
      rowActions: [
        {
          click: (data) => {
            this.trustedDeviceSignOut(data)
            .subscribe(() => {
              this._message.success('Signed out of all devices');  
            });
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
            template: 'Are you sure you would like to delete this record?',
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

              this.listComponent.columnVisibility('account',show);
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
