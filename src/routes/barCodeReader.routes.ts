import { Router } from 'express'
import createConversionBarCode from '../service/conversionBarCodeDates'

const ServiceConversion = new createConversionBarCode()

const barCodeReader = Router()

barCodeReader.get('/:id', async (request, response) => {

var {id} = request.params 

const Conversion = await ServiceConversion.execute({barCode: id})

if(Conversion != null && id.length == 44){

  response.statusCode = 200

  return response.json({ok: Conversion})
}

  response.statusCode = 400

  return response.json({error: Conversion})
  
})


export default barCodeReader

