import { TmdbMoviesEntityBase } from '../TmdbMoviesEntityBase';
import type { TmdbMoviesSDK } from '../TmdbMoviesSDK';
import type { Control } from '../types';
import type { Movie, MovieLoadMatch, MovieListMatch } from '../TmdbMoviesTypes';
declare class MovieEntity extends TmdbMoviesEntityBase<Movie> {
    constructor(client: TmdbMoviesSDK, entopts: any);
    make(this: MovieEntity): MovieEntity;
    load(this: any, reqmatch?: MovieLoadMatch, ctrl?: Control): Promise<MovieEntity>;
    list(this: any, reqmatch?: MovieListMatch, ctrl?: Control): Promise<MovieEntity[]>;
}
export { MovieEntity };
