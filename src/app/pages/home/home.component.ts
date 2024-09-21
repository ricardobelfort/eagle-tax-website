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
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import { SlickCarouselModule } from 'ngx-slick-carousel';

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
    SlickCarouselModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  @ViewChild(ToastComponent) toast!: ToastComponent;
  contactForm!: FormGroup;
  private fb = inject(FormBuilder);

  slides = [
    {
      img: 'https://images.pexels.com/photos/6963017/pexels-photo-6963017.jpeg',
    },
    {
      img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      img: 'https://images.unsplash.com/photo-1579444741963-5ae219cfe27c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      img: 'https://images.pexels.com/photos/6863244/pexels-photo-6863244.jpeg',
    },
  ];

  slideConfig = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    customPaging: function (_slider: any, _i: any) {
      return '<button class="slick-dots"></button>';
    },
  };

  slickInit() {
    console.log('slick initialized');
  }

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
          (error) => {
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
