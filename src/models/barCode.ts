interface DTOBarCode {

  barCode: string

}

export default class BarCode{
      barCode: string

constructor({barCode}: DTOBarCode ){

this.barCode = barCode


  }
}