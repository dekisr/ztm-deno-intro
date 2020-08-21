import { Application } from 'https://deno.land/x/oak@v6.0.2/mod.ts'
import * as log from 'https://deno.land/std/log/mod.ts'

const app = new Application()
const PORT = 8000

app.use(async (ctx, next) => {
  await next()
  const time = ctx.response.headers.get('X-Response-Time')
  log.info(`${ctx.request.method} ${ctx.request.url}: ${time}`)
})

app.use(async (ctx, next) => {
  const start = Date.now()
  await next()
  const delta = Date.now() - start
  ctx.response.headers.set('X-Response-Time', `${delta}`)
})

app.use(async (ctx, next) => {
  ctx.response.body = `
  {___     {__      {_         {__ __        {_       
  {_ {__   {__     {_ __     {__    {__     {_ __     
  {__ {__  {__    {_  {__     {__          {_  {__    
  {__  {__ {__   {__   {__      {__       {__   {__   
  {__   {_ {__  {______ {__        {__   {______ {__  
  {__    {_ __ {__       {__ {__    {__ {__       {__ 
  {__      {__{__         {__  {__ __  {__         {__

                  Mission Control API`
  await next()
})

if (import.meta.main) {
  app.listen({
    port: PORT,
  })
}
