import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {RouterModule} from "@angular/router";
import { PageAcceuilComponent } from './page-acceuil/page-acceuil.component';
import { GuestsComponent } from './guests/guests.component';
import { GiftComponent } from './gift/gift.component';
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    PageAcceuilComponent,
    GuestsComponent,
    GiftComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
HttpClientModule,
    RouterModule.forRoot([
      {path: '', component: PageAcceuilComponent},
      {path:'adminguest', component:GuestsComponent},
      {path:'gift', component:GiftComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
