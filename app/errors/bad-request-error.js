const  { CustomError } = require("./custom-error");

class BadRequestError extends CustomError {
  
  constructor(message){
    super(message);
    this.statusCode = 400;
  }

  serializeErrors(){
    return [{message: this.message }]
  }
}

module.exports = { BadRequestError }