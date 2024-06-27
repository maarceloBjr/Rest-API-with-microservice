import { createClient } from 'redis'
;(async () => {
  const client = await createClient({
    url: 'redis://localhost:6379',
  })
    .on('error', err => console.log('Redis Client Error', err))
    .connect()

  await client.flushAll()

  console.log('Cache flushed')
  return process.exit(0)
})()
