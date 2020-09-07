import { Router, Request, Response } from 'express'
import { BankSlipValidator } from './controllers/SlipValidatorController'

const routes = Router()

routes.get('/', (request: Request, response: Response) => {
  return response.json({ message: 'Welcome'})
})

routes.get('/bsvalidate/:slipNumber', BankSlipValidator)



export default routes