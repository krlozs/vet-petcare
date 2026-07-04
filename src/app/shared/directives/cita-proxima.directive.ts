import { Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appCitaProxima]'
})
export class CitaProximaDirective implements OnChanges {
  @Input('appCitaProxima') fecha = '';

  constructor(
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly renderer: Renderer2
  ) {}

  ngOnChanges(): void {
    if (!this.fecha) {
      return;
    }

    const hoy = new Date().toISOString().slice(0, 10);
    const esHoy = this.fecha === hoy;

    if (esHoy) {
      this.renderer.setStyle(this.elementRef.nativeElement, 'border-color', '#006492');
      this.renderer.setStyle(this.elementRef.nativeElement, 'box-shadow', '0 8px 20px rgba(0, 100, 146, 0.12)');
    }
  }
}
