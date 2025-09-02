import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './components/input/input.component';
import { IonicModule } from '@ionic/angular';
import { ButtonComponent } from './components/button/button.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [InputComponent, ButtonComponent], 
  imports: [CommonModule, IonicModule, ReactiveFormsModule, FormsModule],
  exports: [InputComponent, ButtonComponent, ReactiveFormsModule, FormsModule],
})
export class SharedModule { }
