import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController, LoadingController } from '@ionic/angular';

import { AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';

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
    public loadingController: LoadingController,
    private router: Router,
    private alertCtrl: AlertController
  ) {
    this.signupForm = this.formBuilder.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.getListUsers();
  }


  getListUsers() {
    this._userService.getUsers().subscribe(data => {
      this.users = data;
      // console.log('Dados carregados do banco: ', data);
      data.forEach(element => {
          console.log(element);
      });
    });
  }

  onSubmit(user): void {
    // this._userService.createUsers(user);
    this.navCtrl.navigateRoot('/');
  }

  async onDelete(key) {
    console.log('Deletando o item', key);
    const alert = await this.alertCtrl.create({
      header: 'Confirmar exclusão?',
      message: 'Tem certeza de que deseja excluir esta informação?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'Cancelar',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Ação cancelada pelo usuário!');
          }
        }, {
          text: 'OK',
          handler: () => {
            this._userService.deleteUsers(key);
          }
        }
      ]
    });
  
    await alert.present();
  }


  onEdit(key) {
    console.log('Editando o item', key);
    // this.router.navigate(['/edit/'+key]);
  }

  createUsers() {
    console.log('Create Users');
  }

}
