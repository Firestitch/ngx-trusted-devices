import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { FsExampleModule } from '@firestitch/example';
import { FsMessageModule } from '@firestitch/message';
import { FsTrustedDevicesModule } from '@firestitch/trusted-devices';
import { FsLabelModule } from '@firestitch/label';
import { FsFormModule } from '@firestitch/form';
import { FsStoreModule } from '@firestitch/store';

import { ToastrModule } from 'ngx-toastr';

import { AppMaterialModule } from './material.module';
import {
  KitchenSinkComponent,
  ExamplesComponent
} from './components';
import { AppComponent } from './app.component';
import { TrustedDevicesComponent } from './components/trusted-devices';

const routes: Routes = [
  { path: '', component: ExamplesComponent },
];

@NgModule({
  bootstrap: [ AppComponent ],
  imports: [
    BrowserModule,
    FsTrustedDevicesModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    FormsModule,
    FsLabelModule,
    // FsFormModule,
    FsStoreModule,
    FsExampleModule.forRoot(),
    FsMessageModule.forRoot(),
    ToastrModule.forRoot({ preventDuplicates: true }),
    RouterModule.forRoot(routes),
  ],
  declarations: [
    AppComponent,
    ExamplesComponent,
    // KitchenSinkComponent,
    TrustedDevicesComponent,
  ],
})
export class PlaygroundModule {
}
