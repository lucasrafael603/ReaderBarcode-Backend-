interface DTOInformation {

  barCode: string
  payment: number | string
  dateExpiration: Date | string
  type?: string

}

export default class barCodeInformations{
      barCode: string
      payment: number | string
      dateExpiration: Date | string
      type?: string

constructor({barCode, payment, dateExpiration, type = 'Título Bancário'}: DTOInformation ){

      this.barCode = barCode
      this.payment = payment
      this.dateExpiration = dateExpiration
      this.type = type


  }
}