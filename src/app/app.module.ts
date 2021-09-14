import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppComponent } from './app.component';
import {RouterModule} from "@angular/router";
import { PageAcceuilComponent } from './page-acceuil/page-acceuil.component';
import { GuestsComponent } from './guests/guests.component';
import { GiftComponent } from './gift/gift.component';
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import { NgbdModalConfigComponent } from './ngbd-modal-config/ngbd-modal-config.component';
import { TablesComponent } from './tables/tables.component';

@NgModule({
  declarations: [
    AppComponent,
    PageAcceuilComponent,
    GuestsComponent,
    GiftComponent,
    NgbdModalConfigComponent,
    TablesComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
HttpClientModule,

    RouterModule.forRoot([
      {path: '', component: PageAcceuilComponent},
      {path:'adminguest', component:GuestsComponent},
      {path:'gift', component:GiftComponent},
      {path:'gift/modal', component:NgbdModalConfigComponent},
      {path:'tables',component:TablesComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
