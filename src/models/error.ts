interface DTOTypeError {

  message?: string

}

export default class Error{
      message: string

constructor({message = 'Error'}: DTOTypeError){

this.message = message


  }
}