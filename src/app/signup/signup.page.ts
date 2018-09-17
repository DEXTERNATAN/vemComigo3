import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController, LoadingController } from '@ionic/angular';

import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

import { User } from '../model/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  signupForm: FormGroup;
  users: User[];

  constructor(
    public formBuilder: FormBuilder,
    public navCtrl: NavController,
    private _userService: UserService,
    public loadingController: LoadingController
  ) {
    this.signupForm = this.formBuilder.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() { }

  onSubmit(user): void {
    console.log('Inserindo um novo registro');
    this._userService.createUsers(user);
    // this.navCtrl.navigateRoot('/');
  }

}
