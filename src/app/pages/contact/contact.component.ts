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
import { NgxMaskDirective } from 'ngx-mask';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import Swal from 'sweetalert2';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    NgxMaskDirective,
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
      mensagem: [
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
      const templateParams: { [key: string]: any } = {
        nome: this.contactForm.get('name')?.value,
        email: this.contactForm.get('email')?.value,
        telefone: this.contactForm.get('telephone')?.value,
        mensagem: this.contactForm.get('message')?.value,
      };
  
      emailjs
        .send(
          environment.emailjsServiceId,
          environment.emailjsTemplateId,
          templateParams,
          environment.emailjsUserId
        )
        .then(
          (response: EmailJSResponseStatus) => {
            Swal.fire({
              title: 'Success!',
              text: 'Form submitted successfully!',
              icon: 'success',
              confirmButtonText: 'OK'
            });
            this.contactForm.reset();
            this.contactForm.markAsPristine();
            this.contactForm.markAsUntouched();
          },
          (error) => {
            console.error('FAILED...', error);
            Swal.fire({
              title: 'Error!',
              text: 'Error submitting form. Please try again.',
              icon: 'error',
              confirmButtonText: 'OK'
            });
          }
        );
    } else {
      Swal.fire({
        title: 'Warning!',
        text: 'Please fill in all fields correctly..',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
    }
  }
}
