import { Directive, Input, ElementRef, AfterViewInit } from "@angular/core";

@Directive({
  selector: '[changeStatusColor]'
})
export class ChangeStatusColorDirective implements AfterViewInit{
  constructor(private elementRef: ElementRef) {}

  color: string;

  @Input() set changeStatusColor(status: boolean) {
    if (status) {
      this.color = "#ffae19";
      this.elementRef.nativeElement.style.backgroundColor = this.color;
    } else {
      this.color = "#32cb0a";
      this.elementRef.nativeElement.style.backgroundColor = this.color;
    }
  }

  ngAfterViewInit(): void {
    console.log(this.color);
  }
}
