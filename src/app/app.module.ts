import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';


import {AppComponent} from './app.component';
import {RouterModule} from "@angular/router";
import {PageAcceuilComponent} from './page-acceuil/page-acceuil.component';
import {GuestsComponent} from './guests/guests.component';
import {GiftComponent} from './gift/gift.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {TablesComponent} from './tables/tables.component';

import {GuestVueGuestsComponent} from './guest-vue-guests/guest-vue-guests.component';
import {AuthGuard} from "./auth.guard";
import {LoginComponent} from "./login/login.component";
import {JwtInterceptor} from "./jwt.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    PageAcceuilComponent,
    GuestsComponent,
    GiftComponent,
    LoginComponent,
    TablesComponent,
    GuestVueGuestsComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
//canActivate: [AuthGuard] ,exige qu'on soit authentifier pour y acceder aux routes
    RouterModule.forRoot([

      {
        path: '',
        component: PageAcceuilComponent,
       // canActivate: [AuthGuard],
       // data: {roles: ["ROLE_GUEST", "ROLE_ADMIN"]}
      },
      {//acces à ce router sans etre connecté
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'adminguest/admin',
        component: GuestsComponent,
        canActivate: [AuthGuard],
        data: {roles: ["ROLE_ADMIN"]}
      },
      {
        path: 'adminguest/guest', component: GuestVueGuestsComponent,
       // canActivate: [AuthGuard], data: {roles: ["ROLE_ADMIN", "ROLE_GUEST"]}
      },

      {
        path: 'tables',
        component: TablesComponent,
        // canActivate: [AuthGuard],
        // data: {roles: ["ROLE_GUEST", "ROLE_ADMIN"]}
      },
      {
        path: 'gift',
        component: GiftComponent,
        // canActivate: [AuthGuard],
        // data: {roles: ["ROLE_GUEST", "ROLE_ADMIN"]}
      },
      {
        path: '**',//toutes les routes inconnus, on les redirige vers la page d'acceuil
        component: PageAcceuilComponent,
        canActivate: [AuthGuard],
        data: {roles: ["ROLE_GUEST", "ROLE_ADMIN"]}
      },
    ])
  ],

  providers: [{provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}],
  //bootstrap pour déclarer le composant Racine
  bootstrap: [AppComponent],

})
export class AppModule {
}
