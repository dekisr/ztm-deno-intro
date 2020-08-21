import { Application, send } from 'https://deno.land/x/oak@v6.0.2/mod.ts'
import * as log from 'https://deno.land/std/log/mod.ts'

import api from './api.ts'

const app = new Application()
const PORT = 8000

app.use(async (ctx, next) => {
  await next()
  const time = ctx.response.headers.get('X-Response-Time')
  log.info(`${ctx.request.method} ${ctx.request.url}: ${time}ms`)
})

app.use(async (ctx, next) => {
  const start = Date.now()
  await next()
  const delta = Date.now() - start
  ctx.response.headers.set('X-Response-Time', `${delta}`)
})

app.use(api.routes())
app.use(api.allowedMethods())

app.use(async (ctx) => {
  const filePath = ctx.request.url.pathname
  const fileWhitelist = [
    '/index.html',
    '/javascripts/script.js',
    '/stylesheets/style.css',
    '/images/favicon.png',
  ]
  if (fileWhitelist.includes(filePath)) {
    await send(ctx, filePath, {
      root: `${Deno.cwd()}/public`,
    })
  }
})

if (import.meta.main) {
  app.listen({
    port: PORT,
  })
}
