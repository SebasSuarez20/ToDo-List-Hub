import { Injectable, isDevMode } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  private readonly isProd = !isDevMode();

  log(context: string, message: string, data?: unknown): void {
    if (this.isProd) return;
    console.log(`[${context}] ${message}`, data ?? '');
  }

  warn(context: string, message: string, data?: unknown): void {
    console.warn(`[${context}] ${message}`, data ?? '');
  }

  error(context: string, message: string, data?: unknown): void {
    console.error(`[${context}] ${message}`, data ?? '');
  }
}
