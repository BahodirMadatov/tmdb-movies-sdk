import { MovieEntity } from './entity/MovieEntity';
export type * from './TmdbMoviesTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { TmdbMoviesEntityBase } from './TmdbMoviesEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
type DirectResult = {
    ok: false;
    err: any;
    status?: undefined;
    headers?: undefined;
    data?: undefined;
} | {
    ok: boolean;
    status: number;
    headers: any;
    data: any;
    err?: any;
};
declare class TmdbMoviesSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<DirectResult>;
    _rawRequest(fetchargs?: any): Promise<DirectResult>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Movie(entopts?: Record<string, any>): MovieEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): TmdbMoviesSDK;
    tester(testopts?: any, sdkopts?: any): TmdbMoviesSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof TmdbMoviesSDK;
export { stdutil, config, BaseFeature, TmdbMoviesEntityBase, TmdbMoviesSDK, SDK, };
export type { DirectResult };
