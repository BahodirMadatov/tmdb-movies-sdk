
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'TmdbMovies',
        slug: "tmdb-movies",
    version: "0.1.0",
    target: "ts",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      },
      "optspec": {
        "entity": "`$MAP`",
        "net": "`$MAP`"
      },
      "strict": false,
      "transport": "base"
    },

  }


  options = {
    base: "https://api.themoviedb.org",

    auth: {
      prefix: 'Bearer',
    },

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
        movie: {
        },
  
    }
  }


  entity = {
    "movie": {
      "fields": [
        {
          "name": "adult",
          "title": "Adult",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "backdrop_path",
          "title": "Backdrop Path",
          "type": "`$STRING`"
        },
        {
          "name": "belongs_to_collection",
          "title": "Belongs To Collection",
          "type": "`$OBJECT`"
        },
        {
          "name": "budget",
          "title": "Budget",
          "type": "`$INTEGER`"
        },
        {
          "name": "genre_ids",
          "title": "Genre Ids",
          "type": "`$ARRAY`"
        },
        {
          "name": "genres",
          "title": "Genres",
          "type": "`$ARRAY`"
        },
        {
          "name": "homepage",
          "title": "Homepage",
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$INTEGER`"
        },
        {
          "name": "imdb_id",
          "title": "Imdb Id",
          "type": "`$STRING`"
        },
        {
          "name": "origin_country",
          "title": "Origin Country",
          "type": "`$ARRAY`"
        },
        {
          "name": "original_language",
          "title": "Original Language",
          "type": "`$STRING`"
        },
        {
          "name": "original_title",
          "title": "Original Title",
          "type": "`$STRING`"
        },
        {
          "name": "overview",
          "title": "Overview",
          "type": "`$STRING`"
        },
        {
          "name": "popularity",
          "title": "Popularity",
          "type": "`$NUMBER`"
        },
        {
          "name": "poster_path",
          "title": "Poster Path",
          "type": "`$STRING`"
        },
        {
          "name": "production_companies",
          "title": "Production Companies",
          "type": "`$ARRAY`"
        },
        {
          "name": "production_countries",
          "title": "Production Countries",
          "type": "`$ARRAY`"
        },
        {
          "name": "release_date",
          "title": "Release Date",
          "type": "`$STRING`"
        },
        {
          "name": "revenue",
          "title": "Revenue",
          "type": "`$INTEGER`"
        },
        {
          "name": "runtime",
          "title": "Runtime",
          "type": "`$INTEGER`"
        },
        {
          "name": "spoken_languages",
          "title": "Spoken Languages",
          "type": "`$ARRAY`"
        },
        {
          "name": "status",
          "title": "Status",
          "type": "`$STRING`"
        },
        {
          "name": "tagline",
          "title": "Tagline",
          "type": "`$STRING`"
        },
        {
          "name": "title",
          "title": "Title",
          "type": "`$STRING`"
        },
        {
          "name": "video",
          "title": "Video",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "vote_average",
          "title": "Vote Average",
          "type": "`$NUMBER`"
        },
        {
          "name": "vote_count",
          "title": "Vote Count",
          "type": "`$INTEGER`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "movie",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/3/search/movie",
              "segments": [
                {
                  "lit": "3"
                },
                {
                  "lit": "search"
                },
                {
                  "lit": "movie"
                }
              ],
              "parts": [
                "3",
                "search",
                "movie"
              ],
              "rename": {},
              "transform": {
                "page": {
                  "total": "`body.total_results`"
                },
                "req": "`reqdata`",
                "res": "`body.results`"
              },
              "args": {
                "query": [
                  {
                    "name": "include_adult",
                    "orig": "include_adult",
                    "type": "`$BOOLEAN`",
                    "kind": "query",
                    "example": false
                  },
                  {
                    "name": "language",
                    "orig": "language",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "en-US"
                  },
                  {
                    "name": "page",
                    "orig": "page",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 1
                  },
                  {
                    "name": "primary_release_year",
                    "orig": "primary_release_year",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "query",
                    "orig": "query",
                    "type": "`$STRING`",
                    "kind": "query",
                    "reqd": true
                  },
                  {
                    "name": "region",
                    "orig": "region",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "year",
                    "orig": "year",
                    "type": "`$STRING`",
                    "kind": "query"
                  }
                ]
              },
              "select": {
                "exist": [
                  "query"
                ]
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/3/movie/{movie_id}",
              "segments": [
                {
                  "lit": "3"
                },
                {
                  "lit": "movie"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "3",
                "movie",
                "{id}"
              ],
              "rename": {
                "param": {
                  "movie_id": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "movie_id",
                    "type": "`$INTEGER`",
                    "kind": "param",
                    "reqd": true
                  }
                ],
                "query": [
                  {
                    "name": "append_to_response",
                    "orig": "append_to_response",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "language",
                    "orig": "language",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "en-US"
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "response": {
                "kind": "json",
                "media": "application/json"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

