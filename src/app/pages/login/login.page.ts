import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/shared/services/user/user';
import { AlertController } from '@ionic/angular'; 
import { Router } from '@angular/router';
import { Storage } from 'src/app/shared/providers/storage/storage';

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
    private alertController: AlertController ,
     private router: Router,
     private storageSrv: Storage
  ) {
    this.initForm();
  }

  ngOnInit() {}

public goToRegister() {
  this.router.navigate(['/register']);
}

  public async doLogin() {
    try {
      const user = await this.userSrv.login(this.loginForm.value.email, this.loginForm.value.password);
      
      await this.storageSrv.set('AUTH', JSON.stringify({ uuid: user.uuid }));
      this.loginForm.reset();
      this.router.navigate(['/home']);
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
    
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]);

    this.loginForm = new FormGroup({
      
      password: this.password,
      email: this.email,
    });
  }
}
