import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastComponent } from '@app/shared/components/toast/toast.component';
import { SharedModule } from '@app/shared/shared.module';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    NgxMaskDirective,
    NgxMaskPipe,
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent implements OnInit {
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
          validators: [Validators.required],
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
      const templateParams = {
        nome: this.contactForm.get('nome')?.value,
        email: this.contactForm.get('email')?.value,
        telefone: this.contactForm.get('telefone')?.value,
        messagem: this.contactForm.get('messagem')?.value,
      };

      emailjs
        .send(
          'YOUR_SERVICE_ID',
          'YOUR_TEMPLATE_ID',
          templateParams,
          'YOUR_USER_ID'
        )
        .then(
          (response: EmailJSResponseStatus) => {
            console.log('SUCCESS!', response.status, response.text);
            // Exibir mensagem de sucesso
            this.toast.message = 'Formulário enviado com sucesso!';
            this.toast.type = 'success';
            this.toast.show();
            // Resetar o formulário após o envio bem-sucedido
            this.contactForm.reset();
          },
          (error: any) => {
            console.log('FAILED...', error);
            // Exibir mensagem de erro
            this.toast.message =
              'Erro ao enviar o formulário. Verifique os campos.';
            this.toast.type = 'error';
            this.toast.show();
          }
        );
    } else {
      // Exibir mensagem de erro
      this.toast.message = 'Erro ao enviar o formulário. Verifique os campos.';
      this.toast.type = 'error';
      this.toast.show();
    }
  }
}
