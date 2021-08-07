import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component'; 
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// block components
import { BlockModule } from './block/block.module';

import { SharedModule } from './shared/shared.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SharedImportModule } from './shared-import';
import { JwtInterceptor } from './jwt.interceptor';

@NgModule({
  declarations: [
    AppComponent,



  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule, 
    SharedModule,
    SharedImportModule, 
    MatProgressSpinnerModule,
    HttpClientModule,
    BlockModule     // block compoents
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule { }
