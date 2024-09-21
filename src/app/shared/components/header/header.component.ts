import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  selectedLanguage = 'br';
  dropdownOpen = false;

  options = [
    { value: 'en', text: 'English', img: 'united-states.png' },
    { value: 'es', text: 'Spanish', img: 'spain.png' },
    { value: 'br', text: 'Portuguese', img: 'brazil.png' },
  ];

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectOption(option: any) {
    this.selectedLanguage = option.value;
    this.dropdownOpen = false;
  }

  getSelectedLanguageImage() {
    const selectedOption = this.options.find(
      (option) => option.value === this.selectedLanguage
    );
    return selectedOption ? selectedOption.img : '';
  }
}
