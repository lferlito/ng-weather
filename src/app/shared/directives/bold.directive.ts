import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appBold]'
})
export class BoldDirective {

  private el!: HTMLElement;

  constructor(el: ElementRef) { 
    this.el = el.nativeElement;
  }

  @HostListener('mouseenter') onMouseEnter(){
    this.el.style.fontWeight = 'bold';
   }

   @HostListener('mouseleave') onMouseLeave(){
    this.el.style.fontWeight = '';
   }

}
