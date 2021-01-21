import { Nullable } from '../../helpers/typescript';
import { Entity } from '../../types/entities';
import * as Photo from '../photos/types';

export interface Basic extends Entity {
  bio: Nullable<string>;
  first_name: string;
  instagram_username: Nullable<string>;
  last_name: Nullable<string>;
  links: {
    followers: string;
    following: string;
    html: string;
    likes: string;
    photos: string;
    portfolio: string;
    self: string;
  };
  location: Nullable<string>;
  name: string;
  portfolio_url: Nullable<string>;
  profile_image: {
    small: string;
    medium: string;
    large: string;
  };
  total_collections: number;
  total_likes: number;
  total_photos: number;
  twitter_username: Nullable<string>;
  updated_at: string;
  username: string;
}

export interface Medium extends Basic {
  photos: Photo.VeryBasic[];
}

export interface Full extends Medium {
  downloads: number;
  followers_count: number;
  following_count: number;
}
