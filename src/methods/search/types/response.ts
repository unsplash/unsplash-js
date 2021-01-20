import * as CollectionApi from '../../collections/types';
import * as PhotoApi from '../../photos/types';
import * as UserApi from '../../users/types';

interface Response<A> {
  results: A[];
  total: number;
  total_pages: number;
}

export interface Photos extends Response<PhotoApi.Basic> {}
export interface Collections extends Response<CollectionApi.Basic> {}
export interface Users extends Response<UserApi.Medium> {}
