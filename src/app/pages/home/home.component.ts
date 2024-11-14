import {
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { ToastComponent } from '../../shared/components/toast/toast.component';
import { NgxMaskDirective } from 'ngx-mask';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    SharedModule,
    NgxMaskDirective,
    SlickCarouselModule,
    SweetAlert2Module,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  @ViewChild(ToastComponent) toast!: ToastComponent;
  contactForm!: FormGroup;
  currentStep = 1;
  progress = 0;
  step1Form!: FormGroup;
  step2Form!: FormGroup;
  step3Form!: FormGroup;
  step4Form!: FormGroup;
  step5Form!: FormGroup;
  step6Form!: FormGroup;
  selectedOption!: string;
  grecaptcha: any;

  private fb = inject(FormBuilder);
  private cdr = inject(ChangeDetectorRef);
  private router = inject(Router);

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

  items = [
    {
      icon: 'assets/images/icon-tax.svg',
      title: 'Tax Return Preparation',
      content: 'We provide comprehensive tax return preparation services',
    },
    {
      icon: 'assets/images/icon-bookkeeping.svg',
      title: 'Bookkeeping',
      content: 'We offer meticulous bookkeeping and accounting services',
    },
    {
      icon: 'assets/images/icon-corporate.svg',
      title: 'Corporate Services',
      content: 'We offer comprehensive corporate services',
    },
    {
      icon: 'assets/images/icon-paralegal.svg',
      title: 'Paralegal Services',
      content: 'Our paralegal services specialize in immigration processes',
    },
    {
      icon: 'assets/images/icon-boifincen.svg',
      title: 'BOI Reporting',
      content:
        'We assist clients in filing the Beneficial Ownership Information (BOI)',
    },
    {
      icon: 'assets/images/icon-anual-report.svg',
      title: 'Annual Reports',
      content: 'We assist with the preparation and filing of annual reports',
    },
    {
      icon: 'assets/images/icon-sales-tax.svg',
      title: 'Sales Tax Compliance',
      content: 'Navigating sales tax regulations can be complex',
    },
    {
      icon: 'assets/images/icon-works-compesation.svg',
      title: "Worker's Audits",
      content: 'Our team conducts thorough workers’ compensation audits',
    },
    {
      icon: 'assets/images/icon-1099.svg',
      title: '1099 Reporting',
      content: 'We handle 1099 reports to the IRS',
    },
    {
      icon: 'assets/images/icon-notary.svg',
      title: 'Notary Services',
      content: 'Our notary services are available to authenticate documents',
    },
    {
      icon: 'assets/images/icon-extension.svg',
      title: 'Tax Extensions',
      content: 'If you need more time to file your taxes',
    },
    {
      icon: 'assets/images/icon-audit.svg',
      title: 'IRS Dispute Resolution',
      content: 'Facing an IRS dispute can be daunting',
    },
    {
      icon: 'assets/images/icon-audit.svg',
      title: 'International and Expatriate',
      content:
        'Our specialized services for international and expatriate clients',
    },
    {
      icon: 'assets/images/icon-audit.svg',
      title: 'Payroll Services',
      content:
        'We streamline your payroll process with our comprehensive payroll services',
    },
    {
      icon: 'assets/images/icon-audit.svg',
      title: 'ITIN and CAA Services',
      content:
        'We offer ITIN (Individual Taxpayer Identification Number) services',
    },
  ];

  ngOnInit(): void {
    this.step1Form = this.fb.group({
      option: ['', Validators.required],
    });

    this.step1Form.get('option')!.valueChanges.subscribe((value) => {
      this.updateSelectedOption(value);
      this.initializeForms(value);
    });

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

  initializeForms(option: string) {
    if (option === '1') {
      this.step2Form = this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
      });
      this.step3Form = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
      });
      this.step4Form = this.fb.group({
        phone: ['', Validators.required],
      });
      this.step5Form = this.fb.group({
        message: ['', Validators.required],
      });
    } else if (option === '2') {
      // Inicialize os formulários para a opção 2
      this.step2Form = this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
      });
      this.step3Form = this.fb.group({
        businessName: ['', Validators.required],
      });
      this.step4Form = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
      });
      this.step5Form = this.fb.group({
        phone: ['', Validators.required],
      });
      this.step6Form = this.fb.group({
        message: ['', Validators.required],
      });
    } else if (option === '3') {
      // Inicialize os formulários para a opção 3
      this.step2Form = this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
      });
      this.step3Form = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
      });
      this.step4Form = this.fb.group({
        phone: ['', Validators.required],
      });
      this.step5Form = this.fb.group({
        message: ['', Validators.required],
      });
    }
  }

  nextStep() {
    if (this.currentStep < 6) {
      this.currentStep++;
      this.updateProgress();
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.updateProgress();
      this.cdr.detectChanges();
    }
  }

  updateProgress() {
    this.progress = (this.currentStep - 1) * 20;
  }

  updateSelectedOption(value: string) {
    switch (value) {
      case '1':
        this.selectedOption = 'Impostos pessoais';
        break;
      case '2':
        this.selectedOption = 'Impostos para pequenas empresas';
        break;
      case '3':
        this.selectedOption = 'Começar um novo negócio';
        break;
      default:
        this.selectedOption = '';
    }
  }

  submitForm() {
    let formData;

    if (
      this.selectedOption === 'Impostos pessoais' ||
      this.selectedOption === 'Começar um novo negócio'
    ) {
      if (
        this.step1Form.valid &&
        this.step2Form.valid &&
        this.step3Form.valid &&
        this.step4Form.valid &&
        this.step5Form.valid
      ) {
        formData = {
          ...this.step1Form.value,
          ...this.step2Form.value,
          ...this.step3Form.value,
          ...this.step4Form.value,
          ...this.step5Form.value,
        };
      } else {
        Swal.fire({
          title: 'Erro!',
          text: 'Por favor, preencha todos os campos corretamente.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
        return;
      }
    } else if (this.selectedOption === 'Impostos para pequenas empresas') {
      if (
        this.step1Form.valid &&
        this.step2Form.valid &&
        this.step3Form.valid &&
        this.step4Form.valid &&
        this.step5Form.valid &&
        this.step6Form.valid
      ) {
        formData = {
          ...this.step1Form.value,
          ...this.step2Form.value,
          ...this.step3Form.value,
          ...this.step4Form.value,
          ...this.step5Form.value,
          ...this.step6Form.value,
        };
      } else {
        Swal.fire({
          title: 'Erro!',
          text: 'Por favor, preencha todos os campos corretamente.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
        return;
      }
    }

    Swal.fire({
      title: 'Sucesso!',
      text: 'Obrigado por suas informações! Entraremos em contato em breve.',
      icon: 'success',
      confirmButtonText: 'OK',
    });

    // Resetar o formulário e voltar ao passo inicial
    this.currentStep = 1;
    this.progress = 0;
    this.step1Form.reset();
    this.step2Form.reset();
    this.step3Form.reset();
    this.step4Form.reset();
    this.step5Form.reset();
    if (this.step6Form) this.step6Form.reset();
    return;
  }

  onSubmit() {
    if (this.contactForm.valid) {
      const templateParams: { nome: any; email: any; telefone: any; messagem: any; 'g-recaptcha-response'?: string } = {
        nome: this.contactForm.get('nome')?.value,
        email: this.contactForm.get('email')?.value,
        telefone: this.contactForm.get('telefone')?.value,
        messagem: this.contactForm.get('messagem')?.value,
      };
  
      // Função auxiliar para aguardar o carregamento do grecaptcha
      const executeRecaptcha = () => {
        if (typeof this.grecaptcha !== 'undefined' && this.grecaptcha.execute) {
          this.grecaptcha.ready(() => {
            this.grecaptcha.execute(environment.reCaptchaSiteKey, { action: 'submit' }).then((token: string) => {
              // Inclua o token reCAPTCHA no templateParams
              templateParams['g-recaptcha-response'] = token;
  
              emailjs
                .send(
                  environment.emailjsServiceId,
                  environment.emailjsTemplateId,
                  templateParams,
                  environment.emailjsUserId
                )
                .then(
                  (response: EmailJSResponseStatus) => {
                    console.log('SUCCESS!', response.status, response.text);
                    this.toast.message = 'Formulário enviado com sucesso!';
                    this.toast.type = 'success';
                    this.toast.show();
                    this.contactForm.reset();
                    this.contactForm.markAsPristine();
                    this.contactForm.markAsUntouched();
                  },
                  (error) => {
                    console.error('FAILED...', error);
                    this.toast.message = 'Erro ao enviar o formulário. Tente novamente.';
                    this.toast.type = 'error';
                    this.toast.show();
                  }
                );
            });
          });
        } else {
          console.error('grecaptcha não está disponível. Tentando novamente em 500ms');
          setTimeout(executeRecaptcha, 500); // Tenta novamente após 500ms
        }
      };
  
      executeRecaptcha();
    } else {
      this.toast.message = 'Por favor, preencha todos os campos corretamente.';
      this.toast.type = 'error';
      this.toast.show();
    }
  }

  navigateToService(index: number): void {
    this.router.navigate(['/services'], { queryParams: { index } });
  }
}
