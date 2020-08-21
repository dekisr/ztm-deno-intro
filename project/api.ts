import { Router } from 'https://deno.land/x/oak@v6.0.2/mod.ts'
import * as planets from './models/planets.ts'

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
  ctx.throw(400, 'Sorry, planets aren\'t available!')
  ctx.response.body = planets.getAllPlanets()
})

export default router
