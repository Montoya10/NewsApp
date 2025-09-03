import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './components/input/input.component';
import { IonicModule } from '@ionic/angular';
import { ButtonComponent } from './components/button/button.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { User } from './services/user/user';
import { Uuid } from './providers/uuid/uuid';



const services =[User];
const providers =[Storage, Uuid,];

@NgModule({
  declarations: [InputComponent, ButtonComponent], 
  imports: [CommonModule, IonicModule, ReactiveFormsModule, FormsModule],
  exports: [InputComponent, ButtonComponent, ReactiveFormsModule, FormsModule],
  providers: [...services, ...providers],
})
export class SharedModule { }
