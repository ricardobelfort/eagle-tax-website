import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { ToastComponent } from '../../shared/components/toast/toast.component';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    RouterLink,
    ReactiveFormsModule,
    SharedModule,
    NgxMaskDirective,
    NgxMaskPipe,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  @ViewChild(ToastComponent) toast!: ToastComponent;
  contactForm!: FormGroup;
  private fb = inject(FormBuilder);

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      nome: [
        '',
        {
          validators: [Validators.required, Validators.minLength(3)],
          updateOn: 'blur',
        },
      ],
      email: [
        '',
        {
          validators: [Validators.required, Validators.email],
          updateOn: 'blur',
        },
      ],
      telefone: [
        '',
        {
          validators: [
            Validators.required,
            Validators.pattern(/^\(\d{2}\) \d{5}-\d{4}$/),
          ],
          updateOn: 'blur',
        },
      ],
      messagem: [
        '',
        {
          validators: [Validators.required, Validators.minLength(10)],
          updateOn: 'blur',
        },
      ],
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      // Lógica para enviar o formulário
      console.log(this.contactForm.value);
      // Exibir mensagem de sucesso
      this.toast.message = 'Formulário enviado com sucesso!';
      this.toast.type = 'success';
      this.toast.show();
      // Resetar o formulário após o envio bem-sucedido
      this.contactForm.reset();
    } else {
      // Exibir mensagem de erro
      this.toast.message = 'Erro ao enviar o formulário. Verifique os campos.';
      this.toast.type = 'error';
      this.toast.show();
    }
  }
}
