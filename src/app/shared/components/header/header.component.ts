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

  languages = [
    { value: 'en', label: 'English', image: 'us-flag.png' },
    { value: 'es', label: 'Spanish', image: 'spain-flag.png' },
    { value: 'br', label: 'Portuguese', image: 'brazil-flag.png' },
  ];

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectLanguage(language: string) {
    this.selectedLanguage = language;
    this.dropdownOpen = false;
  }

  getSelectedLanguageImage() {
    const selected = this.languages.find(
      (lang) => lang.value === this.selectedLanguage
    );
    return selected ? selected.image : '';
  }

  onLanguageChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedLanguage = selectElement.value;
  }
}
