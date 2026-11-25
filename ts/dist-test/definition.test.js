"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const __1 = require("..");
const definition_runner_1 = require("./definition-runner");
const utility_1 = require("./utility");
// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
// A JSON string, not an array literal: tsc types a literal as the union of its
// elements, and past about a thousand routes fails with TS2590.
const PLAN = JSON.parse("[{\"entity\":\"movie\",\"accessor\":\"Movie\",\"op\":\"list\",\"method\":\"GET\",\"path\":\"/3/search/movie\",\"args\":[],\"select\":{\"query\":\"v1\",\"include_adult\":\"v1\",\"language\":\"en-US\",\"page\":1,\"primary_release_year\":\"v1\",\"region\":\"v1\",\"year\":\"v1\"},\"headers\":[],\"cookies\":[],\"responseMedia\":[\"application/json\"],\"query\":[\"query\",\"include_adult\",\"language\",\"primary_release_year\",\"page\",\"region\",\"year\"],\"queryArgs\":[{\"name\":\"include_adult\",\"wire\":\"include_adult\"},{\"name\":\"language\",\"wire\":\"language\"},{\"name\":\"page\",\"wire\":\"page\"},{\"name\":\"primary_release_year\",\"wire\":\"primary_release_year\"},{\"name\":\"query\",\"wire\":\"query\"},{\"name\":\"region\",\"wire\":\"region\"},{\"name\":\"year\",\"wire\":\"year\"}],\"auth\":[[{\"in\":\"header\",\"name\":\"authorization\",\"scheme\":\"bearer\"}]],\"status\":200,\"sample\":null,\"idField\":\"id\"},{\"entity\":\"movie\",\"accessor\":\"Movie\",\"op\":\"load\",\"method\":\"GET\",\"path\":\"/3/movie/{movie_id}\",\"args\":[{\"name\":\"id\",\"wire\":\"movie_id\",\"value\":\"p1\"}],\"select\":{\"append_to_response\":\"v1\",\"language\":\"en-US\"},\"headers\":[],\"cookies\":[],\"responseMedia\":[\"application/json\"],\"query\":[\"append_to_response\",\"language\"],\"queryArgs\":[{\"name\":\"append_to_response\",\"wire\":\"append_to_response\"},{\"name\":\"language\",\"wire\":\"language\"}],\"auth\":[[{\"in\":\"header\",\"name\":\"authorization\",\"scheme\":\"bearer\"}]],\"status\":200,\"sample\":{\"adult\":false,\"backdrop_path\":\"/2w4xG178RpB4MDAIfTkqAuSJzec.jpg\",\"belongs_to_collection\":{\"id\":10,\"name\":\"Star Wars Collection\",\"poster_path\":\"/pWVLFh4OuejTpUaDQbB1C4zoS2p.jpg\",\"backdrop_path\":\"/iY2ujEY2m68OTTlPFTiHub9joHS.jpg\"},\"budget\":11000000,\"genres\":[{\"id\":12,\"name\":\"Adventure\"},{\"id\":28,\"name\":\"Action\"},{\"id\":878,\"name\":\"Science Fiction\"}],\"homepage\":\"http://www.starwars.com/films/star-wars-episode-iv-a-new-hope\",\"id\":11,\"imdb_id\":\"tt0076759\",\"origin_country\":[\"US\"],\"original_language\":\"en\",\"original_title\":\"Star Wars\",\"overview\":\"Princess Leia is captured and held hostage by the evil Imperial forces in their effort to take over the galactic Empire. Venturesome Luke Skywalker and dashing captain Han Solo team together with the loveable robot duo R2-D2 and C-3PO to rescue the beautiful princess and restore peace and justice in the Empire.\",\"popularity\":20.6912,\"poster_path\":\"/6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg\",\"production_companies\":[{\"id\":1,\"logo_path\":\"/tlVSws0RvvtPBwViUyOFAO0vcQS.png\",\"name\":\"Lucasfilm Ltd.\",\"origin_country\":\"US\"},{\"id\":25,\"logo_path\":\"/qZCc1lty5FzX30aOCVRBLzaVmcp.png\",\"name\":\"20th Century Fox\",\"origin_country\":\"US\"}],\"production_countries\":[{\"iso_3166_1\":\"US\",\"name\":\"United States of America\"}],\"release_date\":\"1977-05-25\",\"revenue\":775398007,\"runtime\":121,\"spoken_languages\":[{\"english_name\":\"English\",\"iso_639_1\":\"en\",\"name\":\"English\"}],\"status\":\"Released\",\"tagline\":\"A long time ago in a galaxy far, far away...\",\"title\":\"Star Wars\",\"video\":false,\"vote_average\":8.2,\"vote_count\":22061},\"idField\":\"id\"}]");
(0, node_test_1.describe)('definition', () => {
    for (const point of PLAN) {
        (0, node_test_1.test)(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
            const control = (0, utility_1.isControlSkipped)('entityOp', point.entity + '.' + point.op, 'definition');
            if (control.skip) {
                t.skip(control.reason || 'skipped via sdk-test-control.json');
                return;
            }
            await (0, definition_runner_1.runDefinitionPoint)(__1.SDK, point);
        });
    }
});
//# sourceMappingURL=definition.test.js.map