import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/shared/services/user/user';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage implements OnInit {
  public name!: FormControl;
  public lastName!: FormControl;
  public email!: FormControl;
  public password!: FormControl;
  public registerForm!: FormGroup;

  constructor(
    private readonly userSrv: User,
    private alertController: AlertController,
    private router: Router
  ) {
    this.initForm();
  }

  ngOnInit() {}

  private initForm() {
    this.name = new FormControl('', [Validators.required]);
    this.lastName = new FormControl('', [Validators.required]);
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]);

    this.registerForm = new FormGroup({
      name: this.name,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
    });
  }

  public goToLogin() {
  this.router.navigate(['/login']);
}


  public async doRegister() {
    try {
      await this.userSrv.register(this.registerForm.value);
      this.registerForm.reset();
      await this.presentAlert('¡Registro exitoso!', 'Ahora puedes iniciar sesión.');
      this.router.navigate(['/login']);
    } catch (error: any) {
      this.presentAlert('Error', error.message || 'Ocurrió un error');
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
}