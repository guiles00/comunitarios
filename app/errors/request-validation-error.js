const  { CustomError } = require("./custom-error");

class RequestValidationError extends CustomError{
  
  constructor(errors){
    super();
    this.statusCode = 400;
    this.errors = errors;
  }

  serializeErrors(){
    return this.errors.map(err =>{
      return { message: err.msg, field: err.param }
    });
  }
}

module.exports = { RequestValidationError }