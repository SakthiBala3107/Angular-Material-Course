import { computed, effect, Injectable, signal } from '@angular/core';

const STORAGE_KEY = 'theme-class';
const THEME = 'theme-color';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  public mode = signal<'light' | 'dark'>('light');
  public color = signal<'green' | 'red' | 'blue'>('green');

  //public currentTheme = computed(() => `${this.mode()}-${this.color()}`)
  public currentTheme = computed(() => this.color());

  constructor() {
    const isMode = localStorage.getItem(THEME) as 'light' | 'dark';
    if (isMode) {
      this.mode.set(isMode);
    }

    const saved = localStorage.getItem(STORAGE_KEY) as 'green' | 'red' | 'blue';
    if (saved) {
      this.color.set(saved);
    }

    effect(() => {
      document.documentElement.className = this.currentTheme();
      localStorage.setItem(STORAGE_KEY, this.color());
      localStorage.setItem(THEME, this.mode());
    });
  }

  setMode(value: 'light' | 'dark') {
    this.mode.set(value);
  }

  setColor(value: 'green' | 'red' | 'blue') {
    this.color.set(value);
  }
}
