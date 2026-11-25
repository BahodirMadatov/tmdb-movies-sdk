

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { TmdbMoviesSDK, BaseFeature, config, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('MovieEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when TMDB_MOVIES_TEST_LIVE=TRUE.
  afterEach(liveDelay('TMDB_MOVIES_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = TmdbMoviesSDK.test()
    const ent = testsdk.Movie()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('movie hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of TmdbMoviesSDK.test(offline).Movie().stream('list')) { }
    }, /offline/)

    for await (const _item of TmdbMoviesSDK.test(offline).Movie()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = TmdbMoviesSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.Movie().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of TmdbMoviesSDK.test().Movie().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new TmdbMoviesSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.Movie().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.Movie().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = TmdbMoviesSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Movie().list({"include_adult":"x","query":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.TMDB_MOVIES_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'movie.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"adult":{"a":true,"h":"Adult","n":"adult","r":false,"t":"`$BOOLEAN`","key$":"adult","index$":0},"backdrop_path":{"a":true,"h":"Backdrop Path","n":"backdrop_path","r":false,"t":"`$STRING`","key$":"backdrop_path","index$":1},"belongs_to_collection":{"a":true,"h":"Belongs To Collection","n":"belongs_to_collection","r":false,"t":"`$OBJECT`","key$":"belongs_to_collection","index$":2},"budget":{"a":true,"h":"Budget","n":"budget","r":false,"t":"`$INTEGER`","key$":"budget","index$":3},"genre_ids":{"a":true,"h":"Genre Ids","n":"genre_ids","r":false,"t":"`$ARRAY`","key$":"genre_ids","index$":4},"genres":{"a":true,"h":"Genres","n":"genres","r":false,"t":"`$ARRAY`","key$":"genres","index$":5},"homepage":{"a":true,"h":"Homepage","n":"homepage","r":false,"t":"`$STRING`","key$":"homepage","index$":6},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$INTEGER`","key$":"id","index$":7},"imdb_id":{"a":true,"h":"Imdb Id","n":"imdb_id","r":false,"t":"`$STRING`","key$":"imdb_id","index$":8},"origin_country":{"a":true,"h":"Origin Country","n":"origin_country","r":false,"t":"`$ARRAY`","key$":"origin_country","index$":9},"original_language":{"a":true,"h":"Original Language","n":"original_language","r":false,"t":"`$STRING`","key$":"original_language","index$":10},"original_title":{"a":true,"h":"Original Title","n":"original_title","r":false,"t":"`$STRING`","key$":"original_title","index$":11},"overview":{"a":true,"h":"Overview","n":"overview","r":false,"t":"`$STRING`","key$":"overview","index$":12},"popularity":{"a":true,"h":"Popularity","n":"popularity","r":false,"t":"`$NUMBER`","key$":"popularity","index$":13},"poster_path":{"a":true,"h":"Poster Path","n":"poster_path","r":false,"t":"`$STRING`","key$":"poster_path","index$":14},"production_companies":{"a":true,"h":"Production Companies","n":"production_companies","r":false,"t":"`$ARRAY`","key$":"production_companies","index$":15},"production_countries":{"a":true,"h":"Production Countries","n":"production_countries","r":false,"t":"`$ARRAY`","key$":"production_countries","index$":16},"release_date":{"a":true,"h":"Release Date","n":"release_date","r":false,"t":"`$STRING`","key$":"release_date","index$":17},"revenue":{"a":true,"h":"Revenue","n":"revenue","r":false,"t":"`$INTEGER`","key$":"revenue","index$":18},"runtime":{"a":true,"h":"Runtime","n":"runtime","r":false,"t":"`$INTEGER`","key$":"runtime","index$":19},"spoken_languages":{"a":true,"h":"Spoken Languages","n":"spoken_languages","r":false,"t":"`$ARRAY`","key$":"spoken_languages","index$":20},"status":{"a":true,"h":"Status","n":"status","r":false,"t":"`$STRING`","key$":"status","index$":21},"tagline":{"a":true,"h":"Tagline","n":"tagline","r":false,"t":"`$STRING`","key$":"tagline","index$":22},"title":{"a":true,"h":"Title","n":"title","r":false,"t":"`$STRING`","key$":"title","index$":23},"video":{"a":true,"h":"Video","n":"video","r":false,"t":"`$BOOLEAN`","key$":"video","index$":24},"vote_average":{"a":true,"h":"Vote Average","n":"vote_average","r":false,"t":"`$NUMBER`","key$":"vote_average","index$":25},"vote_count":{"a":true,"h":"Vote Count","n":"vote_count","r":false,"t":"`$INTEGER`","key$":"vote_count","index$":26}},"id":{"field":"id","name":"id"},"name":"movie","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /3/search/movie","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":false,"explode":true,"k":"query","n":"include_adult","or":"include_adult","r":false,"style":"form","t":"`$BOOLEAN`","index$":0},{"a":true,"ex":"en-US","explode":true,"k":"query","n":"language","or":"language","r":false,"style":"form","t":"`$STRING`","index$":1},{"a":true,"ex":1,"explode":true,"k":"query","n":"page","or":"page","r":false,"style":"form","t":"`$INTEGER`","index$":2},{"a":true,"explode":true,"k":"query","n":"primary_release_year","or":"primary_release_year","r":false,"style":"form","t":"`$STRING`","index$":3},{"a":true,"explode":true,"k":"query","n":"query","or":"query","r":true,"style":"form","t":"`$STRING`","index$":4},{"a":true,"explode":true,"k":"query","n":"region","or":"region","r":false,"style":"form","t":"`$STRING`","index$":5},{"a":true,"explode":true,"k":"query","n":"year","or":"year","r":false,"style":"form","t":"`$STRING`","index$":6}]},"k":"http","m":"GET","o":"/3/search/movie","q":{"exist":["query"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"3"},{"lit":"search"},{"lit":"movie"}],"t":{"page":{"total":"`body.total_results`"},"req":"`reqdata`","res":"`body.results`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /3/movie/{movie_id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"movie_id","r":true,"t":"`$INTEGER`","index$":0}],"query":[{"a":true,"explode":true,"k":"query","n":"append_to_response","or":"append_to_response","r":false,"style":"form","t":"`$STRING`","index$":0},{"a":true,"ex":"en-US","explode":true,"k":"query","n":"language","or":"language","r":false,"style":"form","t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/3/movie/{movie_id}","q":{"exist":["id"]},"r":{"param":{"movie_id":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"3"},{"lit":"movie"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"fact":{"desc":{"cell":"A movie from search or detail lookup; list searches titles and load retrieves a movie by TMDB ID.","code":"`A movie from search or detail lookup; list searches titles and load retrieves a movie by TMDB ID.`","codecell":"`A movie from search or detail lookup; list searches titles and load retrieves a movie by TMDB ID.`","flat":"A movie from search or detail lookup; list searches titles and load retrieves a movie by TMDB ID.","inline":"A movie from search or detail lookup; list searches titles and load retrieves a movie by TMDB ID.","label":"A movie from search or detail lookup; list searches titles and load retrieves a movie by TMDB ID.","link":"A%20movie%20from%20search%20or%20detail%20lookup;%20list%20searches%20titles%20and%20load%20retrieves%20a%20movie%20by%20TMDB%20ID.","raw":"A movie from search or detail lookup; list searches titles and load retrieves a movie by TMDB ID.","text":"A movie from search or detail lookup; list searches titles and load retrieves a movie by TMDB ID.","vendor":false}},"key$":"movie","name__orig":"movie","Name":"Movie","name_":"movie","name-":"movie","NAME":"MOVIE","index$":0}, {"active":true,"entity":"movie","key$":"BasicMovieFlow","kind":"basic","name":"BasicMovieFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"movie_ref01"}}]},{"a":true,"d":{},"i":{"ref":"movie_ref01","srcdatavar":"movie_ref01_data","suffix":"_dt0"},"m":{"id":"movie01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-movie_ref01"}}],"route":"GET /3/movie/{movie_id}","record":{}}]}, 'Movie', {"GET /3/search/movie":{"protocol":"http","parameters":[{"name":"query","in":"query","required":true,"schema":{"type":"string"},"index$":0},{"name":"include_adult","in":"query","schema":{"type":"boolean","default":false},"index$":1},{"name":"language","in":"query","schema":{"type":"string","default":"en-US"},"index$":2},{"name":"primary_release_year","in":"query","schema":{"type":"string"},"index$":3},{"name":"page","in":"query","schema":{"type":"integer","format":"int32","default":1},"index$":4},{"name":"region","in":"query","schema":{"type":"string"},"index$":5},{"name":"year","in":"query","schema":{"type":"string"},"index$":6}]},"GET /3/movie/{movie_id}":{"protocol":"http","parameters":[{"name":"movie_id","in":"path","schema":{"type":"integer","format":"int32"},"required":true,"index$":0},{"name":"append_to_response","in":"query","description":"comma separated list of endpoints within this namespace, 20 items max","schema":{"type":"string"},"index$":1},{"name":"language","in":"query","schema":{"type":"string","default":"en-US"},"index$":2}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let movie_ref01_data = Object.values(setup.data.existing.movie)[0] as any

    // LIST
    const movie_ref01_ent = client.Movie()
    const movie_ref01_match: any = {}

    const movie_ref01_list = (await movie_ref01_ent.list(movie_ref01_match)).map((e: any) => e.data())


    // LOAD
    const movie_ref01_match_dt0: any = {}
    movie_ref01_match_dt0.id = movie_ref01_data.id
    const movie_ref01_data_dt0 = (await movie_ref01_ent.load(movie_ref01_match_dt0)).data()
    assert(movie_ref01_data_dt0.id === movie_ref01_data.id)


  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/movie/MovieTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = TmdbMoviesSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['movie01','movie02','movie03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'TMDB_MOVIES_TEST_MOVIE_ENTID': idmap,
    'TMDB_MOVIES_TEST_LIVE': 'FALSE',
    'TMDB_MOVIES_TEST_EXPLAIN': 'FALSE',
    'TMDB_MOVIES_APIKEY': '',
  })

  idmap = env['TMDB_MOVIES_TEST_MOVIE_ENTID']

  const live = 'TRUE' === env.TMDB_MOVIES_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['TMDB_MOVIES_TEST_MOVIE_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new TmdbMoviesSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
        apikey: env.TMDB_MOVIES_APIKEY,
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.TMDB_MOVIES_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
