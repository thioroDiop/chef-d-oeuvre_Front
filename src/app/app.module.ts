import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppComponent } from './app.component';
import {RouterModule} from "@angular/router";
import { PageAcceuilComponent } from './page-acceuil/page-acceuil.component';
import { GuestsComponent } from './guests/guests.component';
import { GiftComponent } from './gift/gift.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule,ReactiveFormsModule} from "@angular/forms";

import { TablesComponent } from './tables/tables.component';
import { OderByPipePipe } from './oder-by-pipe.pipe';
import { GuestVueGuestsComponent } from './guest-vue-guests/guest-vue-guests.component';

@NgModule({
  declarations: [
    AppComponent,
    PageAcceuilComponent,
    GuestsComponent,
    GiftComponent,

    TablesComponent,
    OderByPipePipe,
    GuestVueGuestsComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
HttpClientModule,
    FormsModule,

    RouterModule.forRoot([
      {path: '', component: PageAcceuilComponent},
      {path:'adminguest', component:GuestsComponent},
      {path:'gift', component:GiftComponent},
      {path:'adminguest/guest', component:GuestVueGuestsComponent},
      {path:'tables',component:TablesComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent],


})
export class AppModule { }
