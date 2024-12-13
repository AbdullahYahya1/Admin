import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageValidationService {

  constructor() { }

  validateArabic(sentence: string): boolean {
    const arabicRegex = /^[\u0600-\u06FF\s.,?!؛،]*$/;
    return arabicRegex.test(sentence);
  }
  validateEnglish(sentence: string): boolean {
    const englishRegex = /^[A-Za-z\s.,?!]*$/;
    return englishRegex.test(sentence);
  }

  detectLanguage(sentence: string): 'Arabic' | 'English' | 'Unknown' {
    if (this.validateArabic(sentence)) {
      return 'Arabic';
    }
    if (this.validateEnglish(sentence)) {
      return 'English';
    }
    return 'Unknown';
  }
}
