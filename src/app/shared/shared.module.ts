import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastComponent } from './components/toast/toast.component';

@NgModule({
  declarations: [],
  imports: [CommonModule, ToastComponent],
  exports: [ToastComponent],
})
export class SharedModule {}
