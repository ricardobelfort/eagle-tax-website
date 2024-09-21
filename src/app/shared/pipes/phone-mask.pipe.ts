import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneMask',
})
export class PhoneMaskPipe implements PipeTransform {
  transform(value: any): string {
    if (!value) {
      return '';
    }

    let cleaned = value.toString().replace(/\D/g, '');

    if (cleaned.length > 11) {
      cleaned = cleaned.slice(0, 11);
    }

    if (cleaned.length > 2) {
      cleaned = cleaned.replace(/^(\d{2})(\d)/, '($1) $2');
    }
    if (cleaned.length > 7) {
      cleaned = cleaned.replace(/(\d{5})(\d{4})$/, '$1-$2');
    }

    return cleaned;
  }
}
