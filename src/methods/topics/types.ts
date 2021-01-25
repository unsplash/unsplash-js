import { NonEmptyArray } from '../../helpers/typescript';
import { Entity } from '../../types/entities';

import * as Photo from '../photos/types';
import * as User from '../users/types';

export interface Basic extends Entity {
  cover_photo: Photo.Basic | null;
  current_user_contributions: Photo.VeryBasic[];
  description: string | null;
  ends_at: string | null;
  featured: boolean;
  links: {
    self: string;
    html: string;
    photos: string;
  };
  owners: NonEmptyArray<User.Basic>;
  preview_photos: Photo.VeryBasic[] | null;
  published_at: string;
  starts_at: string;
  status: 'open' | 'closed';
  slug: string;
  title: string;
  total_photos: number;
  updated_at: string;
}

export interface Full extends Basic {
  top_contributors: User.Basic[];
}
