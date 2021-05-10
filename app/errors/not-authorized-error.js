const  { CustomError } = require("./custom-error");

class NotAuthorizedError extends CustomError {

  constructor(){
    super("Route not found");
    this.statusCode = 401;
  }

  serializeErrors(){
    return [{ message: "Not Authorized" }];
  }
}

module.exports = { NotAuthorizedError }