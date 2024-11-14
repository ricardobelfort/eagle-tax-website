import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent {
  testimonials = [
    {
      image:
        'https://images.pexels.com/photos/15502152/pexels-photo-15502152/free-photo-of-posed-photo-of-a-young-woman-in-a-black-hat-covered-in-snow.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      quote:
        '“Really happy with the product and kind services provided by Cofile. Will recommend it to the world!”',
      name: 'Ashley Rock',
      position: 'Founder of Paple',
    },
    {
      image:
        'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      quote:
        '“Top class product and services! Since my first sign up, they helped my team a lot.”',
      name: 'Natalie Bloom',
      position: 'Marketing of Simpage',
    },
    {
      image:
        'https://images.pexels.com/photos/2341350/pexels-photo-2341350.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      quote:
        '“The support team was incredibly helpful and responsive. Couldn’t be happier with the results.”',
      name: 'Alex Smith',
      position: 'CEO of Growtech',
    },
    {
      image:
        'https://images.pexels.com/photos/15502152/pexels-photo-15502152/free-photo-of-posed-photo-of-a-young-woman-in-a-black-hat-covered-in-snow.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      quote:
        '“Really happy with the product and kind services provided by Cofile. Will recommend it to the world!”',
      name: 'Ashley Rock',
      position: 'Founder of Paple',
    },
    {
      image:
        'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      quote:
        '“Top class product and services! Since my first sign up, they helped my team a lot.”',
      name: 'Natalie Bloom',
      position: 'Marketing of Simpage',
    },
    {
      image:
        'https://images.pexels.com/photos/2341350/pexels-photo-2341350.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      quote:
        '“The support team was incredibly helpful and responsive. Couldn’t be happier with the results.”',
      name: 'Alex Smith',
      position: 'CEO of Growtech',
    },
    {
      image:
        'https://images.pexels.com/photos/15502152/pexels-photo-15502152/free-photo-of-posed-photo-of-a-young-woman-in-a-black-hat-covered-in-snow.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      quote:
        '“Really happy with the product and kind services provided by Cofile. Will recommend it to the world!”',
      name: 'Ashley Rock',
      position: 'Founder of Paple',
    },
    {
      image:
        'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      quote:
        '“Top class product and services! Since my first sign up, they helped my team a lot.”',
      name: 'Natalie Bloom',
      position: 'Marketing of Simpage',
    },
    {
      image:
        'https://images.pexels.com/photos/2341350/pexels-photo-2341350.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      quote:
        '“The support team was incredibly helpful and responsive. Couldn’t be happier with the results.”',
      name: 'Alex Smith',
      position: 'CEO of Growtech',
    },
  ];

  @ViewChild('testimonialContainer') testimonialContainer!: ElementRef;

  scrollLeft(): void {
    const scrollAmount = this.testimonialContainer.nativeElement.clientWidth;
    this.testimonialContainer.nativeElement.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth',
    });
  }

  scrollRight(): void {
    const scrollAmount = this.testimonialContainer.nativeElement.clientWidth;
    this.testimonialContainer.nativeElement.scrollBy({
      left: scrollAmount,
      behavior: 'smooth',
    });
  }
}
