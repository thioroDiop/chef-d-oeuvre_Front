import { Component } from '@angular/core';
import {AuthGuard} from "./auth.guard";
import {UserService} from "./user.service";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'weedingFront';
  isAuthenticated: boolean= false;
  constructor( private userService: UserService) {

  }

  //fonction pour verifier si un utilisateur est connecté
  isLoggedIn():boolean {
    this.isAuthenticated = this.userService.isLoggedIn();
    return this.isAuthenticated;
  }

  logOut() {
    this.userService.signOut();
  }
}
