import BarCode from '../models/barCode'
import createBarCode from '../service/createBarCode'
import barCodeInformations from '../models/barCodeInformations'
import Error from '../models/error'

interface Request {

barCode: string

}

class conversionBarCodeDates {
  public async execute({barCode}: Request): Promise<barCodeInformations | null | Error >{

      const Service = new createBarCode();

      const errorIncorrectBarCode = new Error({message: 'Favor inserir linhas digitaveis equivalentes a 44 digitos'});

      const generateBarCode = await Service.execute({barCode});

      const lengthCode = generateBarCode ? generateBarCode.barCode.toString().length : 0;

    if(lengthCode == 44 && lengthCode != null){

      const barCodeObject = generateBarCode;
        
      const DeconstructionObject = barCodeObject ? barCodeObject['barCode'].toString() : '';
    
      const VerifyType = /^[8]{1}/gi;

      const typeCode = DeconstructionObject.match(VerifyType)?.toString();

      const conversionType = typeCode ? parseInt(typeCode) : null;

     if(conversionType != 8){
    
      const regexAll = /[0-9]{14}$/gi;

      const convertExpirationDate = /^[0-9]{4}/gi;
    
      const convertPayment = /[0-9]{10}$/gi;

      const expirationAndPayment = DeconstructionObject.match(regexAll)?.toString();
      
      const expirationValue = expirationAndPayment ? expirationAndPayment.match(convertExpirationDate) : null;

      const paymentValue = expirationAndPayment ? expirationAndPayment.match(convertPayment) : null;

      const convertExpirationToNumber = expirationValue ?  parseInt(expirationValue?.toString()) : 0;

      const convertPaymentToNumber = paymentValue ? parseInt(paymentValue?.toString()) : 0;

      var date = new Date('10/07/1997');

      date.setTime(date.getTime() + ( convertExpirationToNumber * 24 * 60 * 60 * 1000));

      ("0" + (date.getDate())).slice(-2) + '/' + ("0" + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear();
      
      const valuesFinally = new barCodeInformations({barCode: DeconstructionObject, dateExpiration: date.toLocaleDateString('pt-BR'), payment: convertPaymentToNumber.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })});
      // Pode-se retirar o toLocaleDateString e varias as opções de datas conforme a necessidade.

      return valuesFinally;

    }else{

      const regexFirstNumbers = /^[0-9]{16}/gi;

      const convertPayment = /[0-9]{10}$/gi;

      const regexUltimateNumbers = /[0-9]{20}$/gi;

      const convertExpiration = /^[0-9]{8}/gi;

      const regexYear = /^[0-9]{4}/gi;

      const regexUltimateCaracters = /[0-9]{4}$/gi;

      const regexMonths = /^[0-9]{2}/gi;

      const regexDays = /[0-9]{2}$/gi;

      const firstNumbersCode = DeconstructionObject.match(regexFirstNumbers)?.toString();

      const UltimateNumbersCode = DeconstructionObject.match(regexUltimateNumbers)?.toString();

      const filterExpiration = UltimateNumbersCode?.match(convertExpiration)?.toString();

      const filterPayment = firstNumbersCode?.match(convertPayment)?.toString();

      const paymentValue = filterPayment ? parseInt(filterPayment) : null;

      const year = filterExpiration?.match(regexYear)?.toString();

      if(parseInt(year ? year : '') > 2020 || parseInt(year ? year : '') < 1950){

          return new Error({message: 'Favor ajustar o ano do boleto'})

      }

      const dayAndMounth = filterExpiration?.match(regexUltimateCaracters)?.toString();

      const months = dayAndMounth?.match(regexMonths)?.toString();

      if(parseInt(months ? months : '') > 12 || parseInt(months ? months : '') < 1){

        return new Error({message: 'Favor ajustar o mês do boleto'})

      }

      const days = dayAndMounth?.match(regexDays)?.toString();

      if(parseInt(days ? days : '') > 31 || parseInt(days ? days : '') < 1){

        return new Error({message: 'Favor ajustar o dia do boleto'})

      }

      const dateFormat = months && days ? `${months}/${days}/${year}` : '';

      var date = new Date(dateFormat);

      const valuesFinally = new barCodeInformations({barCode: DeconstructionObject, dateExpiration: date.toLocaleDateString('pt-BR'), payment: paymentValue ? paymentValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : 0, type: 'Pagamento de Concessionárias'});
      // Pode-se retirar o toLocaleDateString e varias as opções de datas conforme a necessidade.

      return valuesFinally;
    }

  }

     return errorIncorrectBarCode
    
}
}
  
export default conversionBarCodeDates
