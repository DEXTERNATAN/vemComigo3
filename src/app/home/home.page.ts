import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';

import { User } from '../model/user.model';
import { UserService } from './../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  user: User[];

  constructor(
    public navCtrl: NavController,
    private _userService: UserService,
    private alertCtrl: AlertController,
    private route: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.getListUsers();
  }

  getListUsers() {
    this._userService.getUsers().subscribe(data => this.user = data);
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
    this.router.navigate(['/edit/'+key]);
  }

  onSignUp(): void {
    this.navCtrl.navigateRoot('/signup');
  }

}
