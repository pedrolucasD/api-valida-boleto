import express from 'express'
import routes from './routes'
import swaggerUI from  'swagger-ui-express'
import * as swaggerDocument from './swagger.json'

const app = express()

app.use(routes)
app.use('/swagger', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

app.listen(3333)