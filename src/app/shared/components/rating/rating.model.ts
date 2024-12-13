import { faStar as empty } from '@fortawesome/free-regular-svg-icons';
import {
  faStarHalf as half,
  faStar as full,
} from '@fortawesome/free-solid-svg-icons';

export type Volume = 'full' | 'empty' | 'half';

export interface Star {
  starNumber: number;
  volume: Volume;
}

const starVolumeMap: Record<Volume, any> = {
  full: full,
  empty: empty,
  half: half,
};

export function getStarVolume(volume: Volume) {
  return starVolumeMap[volume];
}
