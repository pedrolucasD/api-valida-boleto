import { Router, Request, Response } from 'express'
import { slipValidator } from './controllers/SlipValidatorController'

const routes = Router()

routes.get('/', (request: Request, response: Response) => {
  return response.json({ message: 'Welcome'})
})

routes.get('/validate/:slipNumber', slipValidator)



export default routes