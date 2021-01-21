import { Nullable } from '../../helpers/typescript';
import { Entity } from '../../types/entities';
import * as Collection from '../collections/types';
import * as User from '../users/types';

interface StatValue {
  value: number;
  date: string;
}

interface Stat {
  total: number;
  historical: {
    change: number;
    quantity: number;
    resolution: string;
    values: StatValue[];
  };
}

export interface Stats extends Entity {
  views: Stat;
  downloads: Stat;
}

export interface VeryBasic extends Entity {
  created_at: string;
  updated_at: string;
  urls: {
    full: string;
    raw: string;
    regular: string;
    small: string;
    thumb: string;
  };
}

export interface Basic extends VeryBasic {
  alt_description: Nullable<string>;
  blur_hash: Nullable<string>;
  color: Nullable<string>;
  description: Nullable<string>;
  height: number;
  likes: number;
  links: {
    self: string;
    html: string;
    download: string;
    download_location: string;
  };
  promoted_at: Nullable<string>;
  width: number;
  user: User.Basic;
}

interface ExifAndLocation {
  exif: {
    make: Nullable<string>;
    model: Nullable<string>;
    exposure_time: Nullable<string>;
    aperture: Nullable<string>;
    focal_length: Nullable<string>;
    iso: Nullable<number>;
  };
  location: {
    city: Nullable<string>;
    country: Nullable<string>;

    /** full string representation of the location, including `city` and `country` if they exist. */
    name: Nullable<string>;

    position: {
      latitude: Nullable<number>;
      longitude: Nullable<number>;
    };
  };
}

export interface Random extends Basic, ExifAndLocation {}

type RelatedCollectionsType =
  // Ambiguously related collections
  | 'related'
  // Collections the photo belongs to
  | 'collected';

export interface Full extends Basic, ExifAndLocation {
  related_collections: {
    type: RelatedCollectionsType;
    results: Collection.Basic[];
    total: number;
  };
}
