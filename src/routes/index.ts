import { Router } from 'express'
import barCodeReader from './barCodeReader.routes'

const routes = Router()

routes.use('/boleto', barCodeReader)

export default routes
