import { CommonModule, ViewportScroller } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { environment } from '@environments/environment';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgxMaskDirective } from 'ngx-mask';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import Swal from 'sweetalert2';
import { ToastComponent } from '../../shared/components/toast/toast.component';
import { SharedModule } from '../../shared/shared.module';

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
  private viewportScroller = inject(ViewportScroller);

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

  fullDescriptions: { [key: string]: string } = {
    'Tax Return Preparation': `We provide comprehensive tax return preparation services, ensuring that your filings are accurate, timely, and compliant with federal and state regulations. Our experienced team navigates the complexities of tax codes to maximize your deductions and minimize your liabilities.`,
    'Bookkeeping': `We offer meticulous bookkeeping and accounting services tailored to your business needs. From daily transaction management to financial reporting, our team ensures your records are accurate and up-to-date, enabling you to make informed decisions.`,
    'Corporate Services': `We offer comprehensive corporate services, including the formation and dissolution of LLCs and corporations. Our experts guide you through the legal requirements and paperwork, ensuring a smooth and efficient process tailored to your business needs.`,
    'BOI Reporting': `We assist clients in filing the Beneficial Ownership Information (BOI) report with FINCEN, ensuring compliance with federal regulations regarding the disclosure of beneficial ownership.`,
    'Annual Reports': `We assist with the preparation and filing of annual reports required to renew your company registration with the Secretary of State, helping you maintain compliance and good standing.`,
    'Sales Tax Compliance': `Navigating sales tax regulations can be complex. Our services help businesses ensure compliance with local, state, and federal sales tax laws, reducing the risk of audits and penalties while optimizing your tax position.`,
    "Worker's Audits": `Our team conducts thorough workers’ compensation audits to ensure compliance with state regulations and accurate premium calculations. We help you identify potential savings and reduce your overall costs while maintaining proper coverage.`,
    '1099 Reporting': `We handle 1099 reports to the IRS, ensuring that your independent contractors and other payees are reported accurately and on time.`,
    'Notary Services': `Our notary services are available to authenticate documents, providing the legal assurance you need for important paperwork.`,
    'Tax Extensions': `If you need more time to file your taxes, we can help you apply for a tax extension, giving you additional time to prepare and submit your returns without penalties.`,
    'IRS Dispute Resolution': `Facing an IRS dispute can be daunting. Our experts are here to assist you in resolving issues with the IRS, including audits, penalties, and collections. We advocate on your behalf, working to reach favorable outcomes and restore your peace of mind.`,
    'International and Expatriate': `Our specialized services for international and expatriate clients address unique tax challenges, including compliance with U.S. tax laws and regulations. We help you understand your obligations while maximizing your benefits, ensuring a smooth tax experience whether you are living abroad or returning home.`,
    'Payroll Services': `We streamline your payroll process with our comprehensive payroll services, handling everything from payroll processing to tax withholdings. We ensure compliance with all payroll regulations, allowing you to focus on growing your business.`,
    'ITIN and CAA Services': `We offer ITIN (Individual Taxpayer Identification Number) services, authorized by the IRS to certify passports for the ITIN application process. Our Certified Acceptance Agents (CAAs) simplify the process, ensuring you receive your ITIN efficiently and accurately.`,
  };

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.viewportScroller.scrollToPosition([0, 0]);
      }
    });

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
      mensagem: [
        '',
        {
          validators: [Validators.required, Validators.minLength(10)],
          updateOn: 'blur',
        },
      ],
    });
  }

  initializeForms(option: string) {
    if (option === 'Personal Taxes') {
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
    } else if (option === 'Small-Business Taxes') {
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
    } else if (option === 'Start a Business') {
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
      case 'Personal Taxes':
        this.selectedOption = 'Personal Taxes';
        break;
      case 'Small-Business Taxes':
        this.selectedOption = 'Small-Business Taxes';
        break;
      case 'Start a Business':
        this.selectedOption = 'Start a Business';
        break;
      default:
        this.selectedOption = '';
    }
  }

  submitForm() {
    let formData;

    if (
      this.selectedOption === 'Personal Taxes' ||
      this.selectedOption === 'Start a Business'
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
          title: 'Error!',
          text: 'Please fill in all fields correctly.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
        return;
      }
    } else if (this.selectedOption === 'Small-Business Taxes') {
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
          title: 'Error!',
          text: 'Please fill in all fields correctly.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
        return;
      }
    }

    if (!formData) {
      console.error('Form data is undefined!');
      return;
    }

    // Envio do formulário via EmailJS
    emailjs
      .send(
        environment.emailjsServiceId,
        environment.emailjsHelpTemplateId,
        formData,
        environment.emailjsUserId
      )
      .then(
        (response: EmailJSResponseStatus) => {
          console.log('SUCCESS!', response.status, response.text);
          Swal.fire({
            title: 'Success!',
            text: 'Thank you for your information! We will contact you shortly.',
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
        },
        (error: any) => {
          console.error('FAILED...', error);
          Swal.fire({
            title: 'Error!',
            text: 'Error submitting form. Please try again.',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
      );
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
            console.log('SUCCESS!', response.status, response.text);
            Swal.fire({
              title: 'Success!',
              text: 'Form submitted successfully!',
              icon: 'success',
              confirmButtonText: 'OK',
            });
            this.contactForm.reset();
            this.contactForm.markAsPristine();
            this.contactForm.markAsUntouched();
          },
          (error: any) => {
            console.error('FAILED...', error);
            Swal.fire({
              title: 'Error!',
              text: 'Error submitting form. Please try again.',
              icon: 'error',
              confirmButtonText: 'OK',
            });
          }
        );
    } else {
      Swal.fire({
        title: 'Warning!',
        text: 'Please fill in all fields correctly..',
        icon: 'warning',
        confirmButtonText: 'OK',
      });
    }
  }

  openServiceModal(item: { icon: string; title: string; content: string }): void {
    const fullContent = this.fullDescriptions[item.title] || item.content;

    Swal.fire({
      title: item.title,
      html: `
        <div style="display: flex; flex-direction: column; text-align: left;">
          <p style="font-size: 1rem; line-height: 1.6;">${fullContent}</p>
        </div>
      `,
      showCloseButton: true,
      showConfirmButton: false,
      width: 600,
      customClass: {
        popup: 'swal2-service-modal',
      },
    });
  }
}
