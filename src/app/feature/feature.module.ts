import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeatureRoutingModule } from './feature-routing.module';

import { SharedImportModule } from '../shared-import';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FeatureRoutingModule,
    SharedImportModule,
    SharedModule
  ]
})
export class FeatureModule { }
