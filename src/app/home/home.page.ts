import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { User } from '../model/user.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  
  user: User[];

  constructor(
    public navCtrl: NavController,
    public _userService: UserService
  ) { }

  ngOnInit(): void {
    this._userService.getUsers().subscribe(data => this.user = data);
  }


  onSignUp(): void {
    this.navCtrl.navigateRoot('/signup');
  }

}
