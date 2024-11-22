import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
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
  selectedLanguage = 'en';
  dropdownOpen = false;

  languages = [
    { value: 'en', label: 'English', image: 'us-flag.png' },
    { value: 'es', label: 'Spanish', image: 'spain-flag.png' },
    {
      value: 'br',
      label: 'Português',
      image: 'brazil-flag.png',
    },
  ];

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectLanguage(language: string) {
    if (this.selectedLanguage !== language) {
      this.selectedLanguage = language;
    }
    setTimeout(() => {
      this.dropdownOpen = false;
    }, 100);
  }

  getSelectedLanguageImage() {
    const selected = this.languages.find(
      (lang) => lang.value === this.selectedLanguage
    );
    return selected ? 'assets/images/' + selected.image : '';
  }

  onLanguageChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedLanguage = selectElement.value;
  }

  // Captura clique fora do dropdown para fechar
  @HostListener('document:click', ['$event'])
  closeDropdownOnClickOutside(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.custom-select-wrapper')) {
      this.dropdownOpen = false;
    }
  }
}
