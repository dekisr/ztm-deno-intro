import { Router } from './deps.ts'
import * as planets from './models/planets.ts'
import * as launches from './models/launches.ts'

const router = new Router()

router.get('/', (ctx) => {
  ctx.response.body = `
  {___     {__      {_         {__ __        {_       
  {_ {__   {__     {_ __     {__    {__     {_ __     
  {__ {__  {__    {_  {__     {__          {_  {__    
  {__  {__ {__   {__   {__      {__       {__   {__   
  {__   {_ {__  {______ {__        {__   {______ {__  
  {__    {_ __ {__       {__ {__    {__ {__       {__ 
  {__      {__{__         {__  {__ __  {__         {__

                  Mission Control API`
})

router.get('/planets', (ctx) => {
  // throw new Error('Sample Error')
  // ctx.throw(400, 'Sorry, planets aren\'t available!')
  ctx.response.body = planets.getAll()
})

router.get('/launches', (ctx) => {
  ctx.response.body = launches.getAll()
})

router.get('/launches/:id', (ctx) => {
  if (ctx.params?.id) {
    const launchesList = launches.getOne(Number(ctx.params.id))
    if (launchesList) {
      ctx.response.body = launchesList
    } else {
      ctx.throw(400, 'Launch with that ID does not exist.')
    }
  }
})

router.post('/launches', async (ctx) => {
  const body = ctx.request.body()
  launches.addOne(await body.value)
  ctx.response.body = {
    success: true,
  }
  ctx.response.status = 201
})

router.delete('/launches/:id', (ctx) => {
  if (ctx.params?.id) {
    const result = launches.removeOne(Number(ctx.params.id))
    ctx.response.body = { success: result }
  }
})

export default router
