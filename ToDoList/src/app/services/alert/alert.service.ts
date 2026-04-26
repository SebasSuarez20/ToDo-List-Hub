import { Injectable } from '@angular/core';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  // ─── PALETA DE COLORES (consistente con el diseño de la app) ──────────────
  private readonly colors = {
    background: '#1a1040',
    text: '#e2e8f0',
    title: '#ffffff',
    confirmBg: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
    cancelBg: 'rgba(255,255,255,0.08)',
    border: 'rgba(255,255,255,0.12)',
  };

  // ─── BASE CONFIG (Glassmorphism) ─────────────────────────────────────────
  private baseConfig() {
    return {
      toast: true,
      position: 'top-end' as const,
      background: this.colors.background,
      color: this.colors.text,
      customClass: {
        popup: 'swal-glass-popup',
        title: 'swal-glass-title',
        htmlContainer: 'swal-glass-html',
        confirmButton: 'swal-btn-confirm',
        cancelButton: 'swal-btn-cancel',
        denyButton: 'swal-btn-deny',
      },
      buttonsStyling: false,
      showClass: {
        popup: 'animate__animated animate__fadeInDown animate__faster',
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp animate__faster',
      },
    };
  }


  /**
   * Muestra un alert de éxito. Se cierra automáticamente si se pasa `timer`.
   * @param title     Título principal
   * @param message   Mensaje descriptivo (opcional)
   * @param timer     Milisegundos para cierre automático (por defecto 2500)
   */
  success(title: string, message: string = '', timer: number = 2500): Promise<SweetAlertResult> {
    return Swal.fire({
      ...this.baseConfig(),
      icon: 'success',
      title,
      text: message || undefined,
      timer,
      timerProgressBar: true,
      showConfirmButton: false,
      iconColor: '#34d399',
    });
  }


  /**
   * Muestra un alert de error.
   * @param title     Título principal
   * @param message   Detalle del error (opcional)
   */
  error(title: string, message: string = ''): Promise<SweetAlertResult> {
    return Swal.fire({
      ...this.baseConfig(),
      icon: 'error',
      title,
      text: message || undefined,
      confirmButtonText: 'Entendido',
      iconColor: '#f87171',
    });
  }

  /**
   * Muestra un alert de advertencia.
   * @param title     Título principal
   * @param message   Mensaje de advertencia (opcional)
   */
  warning(title: string, message: string = ''): Promise<SweetAlertResult> {
    return Swal.fire({
      ...this.baseConfig(),
      icon: 'warning',
      title,
      text: message || undefined,
      confirmButtonText: 'Aceptar',
      iconColor: '#fb923c',
    });
  }

  /**
   * Muestra un diálogo de confirmación con dos botones.
   * Retorna `true` si el usuario confirma, `false` si cancela.
   * @param title         Título de la pregunta
   * @param message       Descripción (opcional)
   * @param confirmLabel  Texto del botón confirmar (por defecto: "Sí, continuar")
   * @param cancelLabel   Texto del botón cancelar  (por defecto: "Cancelar")
   */
  async confirm(
    title: string,
    message: string = '',
    confirmLabel: string = 'Sí, continuar',
    cancelLabel: string = 'Cancelar'
  ): Promise<boolean> {
    const result = await Swal.fire({
      ...this.baseConfig(),
      icon: 'question',
      title,
      text: message || undefined,
      showCancelButton: true,
      confirmButtonText: confirmLabel,
      cancelButtonText: cancelLabel,
      reverseButtons: true,
      iconColor: '#a78bfa',
    });
    return result.isConfirmed;
  }

  /**
   * Diálogo pre-configurado para confirmar una eliminación.
   * Retorna `true` si el usuario confirma.
   * @param itemName  Nombre del elemento a eliminar (opcional)
   */
  async confirmDelete(itemName: string = 'este elemento'): Promise<boolean> {
    const result = await Swal.fire({
      ...this.baseConfig(),
      icon: 'warning',
      title: '¿Eliminar?',
      html: `Esta acción eliminará <strong>${itemName}</strong> y no se puede deshacer.`,
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
      iconColor: '#f87171',
    });
    return result.isConfirmed;
  }
}
