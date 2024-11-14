import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css',
})
export class ServicesComponent implements OnInit, AfterViewInit {
  items = [
    {
      icon: 'assets/images/icon-tax.svg',
      title: 'Tax Return Preparation',
      content:
        'We provide comprehensive tax return preparation services, ensuring that your filings are accurate, timely, and compliant with federal and state regulations. Our experienced team navigates the complexities of tax codes to maximize your deductions and minimize your liabilities.',
    },
    {
      icon: 'assets/images/icon-bookkeeping.svg',
      title: 'Bookkeeping and Accounting Services',
      content:
        'We offer meticulous bookkeeping and accounting services tailored to your business needs. From daily transaction management to financial reporting, our team ensures your records are accurate and up-to-date, enabling you to make informed decisions.',
    },
    {
      icon: 'assets/images/icon-corporate.svg',
      title: 'Corporate Services',
      content:
        'We offer comprehensive corporate services, including the formation and dissolution of LLCs and corporations. Our experts guide you through the legal requirements and paperwork, ensuring a smooth and efficient process tailored to your business needs.',
    },
    {
      icon: 'assets/images/icon-paralegal.svg',
      title: 'Paralegal Services',
      content:
        'Our paralegal services specialize in immigration processes, providing guidance and support for individuals navigating visa applications, residency permits, and other immigration-related matters. We ensure that you understand the requirements and assist you through each step of the process.',
    },
    {
      icon: 'assets/images/icon-boifincen.svg',
      title: 'BOI Reporting',
      content:
        'We assist clients in filing the Beneficial Ownership Information (BOI) report with FINCEN, ensuring compliance with federal regulations regarding the disclosure of beneficial ownership.',
    },
    {
      icon: 'assets/images/icon-anual-report.svg',
      title: 'Anual Reports',
      content:
        'We assist with the preparation and filing of annual reports required to renew your company registration with the Secretary of State, helping you maintain compliance and good standing.',
    },
    {
      icon: 'assets/images/icon-sales-tax.svg',
      title: 'Sales Tax Compliance',
      content:
        'Navigating sales tax regulations can be complex. Our services help businesses ensure compliance with local, state, and federal sales tax laws, reducing the risk of audits and penalties while optimizing your tax position.',
    },
    {
      icon: 'assets/images/icon-works-compesation.svg',
      title: 'Workers’ Compensation Audits',
      content:
        'Our team conducts thorough workers’ compensation audits to ensure compliance with state regulations and accurate premium calculations. We help you identify potential savings and reduce your overall costs while maintaining proper coverage.',
    },
    {
      icon: 'assets/images/icon-1099.svg',
      title: '1099 Reporting',
      content:
        'We handle 1099 reports to the IRS, ensuring that your independent contractors and other payees are reported accurately and on time.',
    },
    {
      icon: 'assets/images/icon-notary.svg',
      title: 'Notary Services',
      content:
        'Our notary services are available to authenticate documents, providing the legal assurance you need for important paperwork.',
    },
    {
      icon: 'assets/images/icon-extension.svg',
      title: 'Tax Extensions',
      content:
        'If you need more time to file your taxes, we can help you apply for a tax extension, giving you additional time to prepare and submit your returns without penalties.',
    },
    {
      icon: 'assets/images/icon-audit.svg',
      title: 'IRS Dispute Resolution',
      content:
        'Facing an IRS dispute can be daunting. Our experts are here to assist you in resolving issues with the IRS, including audits, penalties, and collections. We advocate on your behalf, working to reach favorable outcomes and restore your peace of mind.',
    },
    {
      icon: 'assets/images/icon-audit.svg',
      title: 'International and Expatriate Taxes',
      content:
        'Our specialized services for international and expatriate clients address unique tax challenges, including compliance with U.S. tax laws and regulations. We help you understand your obligations while maximizing your benefits, ensuring a smooth tax experience whether you are living abroad or returning home.',
    },
    {
      icon: 'assets/images/icon-audit.svg',
      title: 'Payroll Services',
      content:
        'We streamline your payroll process with our comprehensive payroll services, handling everything from payroll processing to tax withholdings. We ensure compliance with all payroll regulations, allowing you to focus on growing your business.',
    },
    {
      icon: 'assets/images/icon-audit.svg',
      title: 'ITIN and CAA Services',
      content:
        'We offer ITIN (Individual Taxpayer Identification Number) services, authorized by the IRS to certify passports for the ITIN application process. Our Certified Acceptance Agents (CAAs) simplify the process, ensuring you receive your ITIN efficiently and accurately.',
    },
  ];

  activeIndex: number | null = null;

  constructor(private route: ActivatedRoute, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const index = +params['index'];
      if (!isNaN(index)) {
        this.activeIndex = index;
      }
    });
  }

  ngAfterViewInit(): void {
    // Defina o scroll para o acordeão específico após um delay
    setTimeout(() => {
      if (this.activeIndex !== null) {
        const accordionElement = document.getElementById(
          `accordion-item-${this.activeIndex}`
        );
        accordionElement?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
        this.cdr.detectChanges();
      }
    }, 300); // Ajuste o delay se necessário
  }

  toggleAccordion(index: number): void {
    this.activeIndex = this.activeIndex === index ? null : index;
  }
}
