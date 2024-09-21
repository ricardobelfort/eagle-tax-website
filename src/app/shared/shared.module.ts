import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhoneMaskPipe } from './pipes/phone-mask.pipe';
import { ToastComponent } from './components/toast/toast.component';

@NgModule({
  declarations: [PhoneMaskPipe],
  imports: [CommonModule, ToastComponent],
  exports: [PhoneMaskPipe, ToastComponent],
})
export class SharedModule {}
