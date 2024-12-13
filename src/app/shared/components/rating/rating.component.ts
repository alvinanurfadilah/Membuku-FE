import {
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { StarComponent } from './star/star.component';
import { Star } from './rating.model';

@Component({
  selector: 'app-rating',
  standalone: true,
  imports: [StarComponent],
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.css',
})
export class RatingComponent implements OnChanges {
  stars: Star[] = [
    { starNumber: 1, volume: 'empty' },
    { starNumber: 2, volume: 'empty' },
    { starNumber: 3, volume: 'empty' },
    { starNumber: 4, volume: 'empty' },
    { starNumber: 5, volume: 'empty' },
  ];
  isReadOnly: boolean = false;
  @Output() rated = new EventEmitter<1 | 2 | 3 | 4 | 5>();
  @Input({ required: true }) rate!: 1 | 2 | 3 | 4 | 5 | null;

  ngOnChanges(changes: SimpleChanges): void {
    if (this.rate) {
      for (let star of this.stars) {
        if (star.starNumber <= this.rate) {
          star.volume = 'full';
          continue;
        }
        star.volume = 'empty';
      }
      this.isReadOnly = true;
    } else {
      for (let star of this.stars) {
        star.volume = 'empty';
      }
      this.isReadOnly = false;
    }
  }
  onSelectedRating(rate: number) {
    this.rated.emit(rate as 1 | 2 | 3 | 4 | 5);
  }
}
