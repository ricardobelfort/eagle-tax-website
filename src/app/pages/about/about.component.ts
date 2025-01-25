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
      image: 'assets/images/pizzarella.jpeg',
      quote:
        '“We have been with Eagle Tax for many years, and one of the things we like most is the service! The team always treats us with great attention and respect, and you can feel that they really care about our business. In addition to taking care of everything for us, they are always available to answer questions and help with whatever we need. This makes all the difference in our day-to-day work! With their support, we can focus on what we do best: serving our pizzas and taking good care of our customers.”',
      name: 'Fernando Braga',
      position: 'Pizzarella Corp.',
    },
    {
      image:
        'assets/images/personal-branding.png',
      quote:
        '“They are the best. I dont worry about anything. Eagletax has always been and will always be my protector with my businesses in this country.thank you for everything and I highly recommend them to everyone”',
      name: 'Ricardo C. Chimenes',
      position: 'Rick and Sons Tile, Inc',
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
