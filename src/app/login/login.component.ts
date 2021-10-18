import {Component, OnInit} from '@angular/core';
import {UserService} from "../user.service";
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  constructor(private userService: UserService, private formBuilder: FormBuilder, private router: Router) {
  }

  ngOnInit(): void {
  }

  //fonction pour se connecter
  onConnect() {
    this.userService.signIn({
      username: this.username?.value,
      password: this.password?.value
    }).subscribe(() => this.router.navigate(['']));//route vers la racine en cas de succes

  }

  //recupere le username renseigné dans le formulaire
  get username() {
   return this.loginForm.get('username');
 }

  //recupere le password renseigné dans le formulaire
  get password() {
    return this.loginForm.get('password');
  }
}
