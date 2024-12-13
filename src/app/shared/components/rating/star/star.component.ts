import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { getStarVolume, Star } from './star.model';

@Component({
  selector: 'app-star',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './star.component.html',
  styleUrl: './star.component.css',
})
export class StarComponent {
  @Input({ required: true }) star!: Star;
  get starVolume() {
    return getStarVolume(this.star.volume);
  }
}
