import BarCode from '../models/barCode'

interface Request {

barCode: string

}

class createBarCode {
  public async execute({barCode}: Request): Promise<BarCode | null >{

    const regexNumbers = /[0-9]{44}/gi;

    var validationNumbers = barCode.match(regexNumbers);
    
    if(validationNumbers?.toString().length === 44){

      const code = new BarCode({barCode});

      return code;

    }

    return null;
  }
}
  
export default createBarCode
