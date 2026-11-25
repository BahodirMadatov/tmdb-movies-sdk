
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { TmdbMoviesSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = TmdbMoviesSDK.test()
    equal(testsdk instanceof TmdbMoviesSDK, true,
      'TmdbMoviesSDK.test() must return a client synchronously')
  })

})
