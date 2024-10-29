import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css',
})
export class ServicesComponent {
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
      title: 'Corporate',
      content: 'Descrição detalhada do serviço 3.',
    },
    {
      icon: 'assets/images/icon-paralegal.svg',
      title: 'Paralegal',
      content: 'Descrição detalhada do serviço 3.',
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
      title: 'Works Compesation',
      content: 'Descrição detalhada do serviço 3.',
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
      title: 'Extensão',
      content: 'Descrição detalhada do serviço 3.',
    },
    {
      icon: 'assets/images/icon-audit.svg',
      title: 'Auditoria',
      content: 'Descrição detalhada do serviço 3.',
    },
  ];

  activeIndex: number | null = null;

  toggleAccordion(index: number): void {
    this.activeIndex = this.activeIndex === index ? null : index;
  }
}
