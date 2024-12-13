import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  inject,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-dropdown-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dropdown-button.component.html',
  styleUrl: './dropdown-button.component.css',
})
export class DropdownButtonComponent {
  @Input({ required: true }) buttonContent!: { text: string; value: any };
  @Input({ required: true }) dropdownContents!: { text: string; value: any }[];
  @Output() result = new EventEmitter<any>();
  elementRef = inject(ElementRef);
  isDropdownVisible = false;

  onExpand() {
    this.isDropdownVisible = !this.isDropdownVisible;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const clickedInside = this.elementRef.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.isDropdownVisible = false;
    }
  }

  onClick(value: any) {
    this.result.emit(value);
    // window.alert('Telah berhasil di tambahkan!');
  }
}
