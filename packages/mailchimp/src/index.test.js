const micro = require('micro')
const test = require('ava')
const listen = require('test-listen')
const fetch = require('isomorphic-unfetch')

test('my endpoint', async (t) => {
  const service = micro(async (req, res) => {
    micro.send(res, 200, {
      test: 'woot'
    })
  })

  const url = await listen(service)
  const body = await fetch(url)
  const text = await body.text()

  t.deepEqual(JSON.parse(text).test, 'woot')
  service.close()
})
