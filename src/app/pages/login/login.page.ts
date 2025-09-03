import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/shared/services/user/user';
import { AlertController } from '@ionic/angular'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {
  public name!: FormControl;
  public lastName!: FormControl;
  public email!: FormControl;
  public password!: FormControl;

  public loginForm!: FormGroup;

  constructor(
    private readonly userSrv: User,
    private alertController: AlertController 
  ) {
    this.initForm();
  }

  ngOnInit() {}

  public async doLogin() {
    try {
      await this.userSrv.register(this.loginForm.value); 
      this.loginForm.reset();
    } catch (error: any) {
      this.presentAlert('Cálmate:', error.message || 'Ocurrió un error');
    }
  }

  private async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  private initForm() {
    this.name = new FormControl('', [Validators.required]);
    this.lastName = new FormControl('', [Validators.required]);
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]);

    this.loginForm = new FormGroup({
      name: this.name,
      lastName: this.lastName,
      password: this.password,
      email: this.email,
    });
  }
}
