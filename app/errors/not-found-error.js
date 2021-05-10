const  { CustomError } = require("./custom-error");

class NotFoundError extends CustomError {

  constructor(){
    super("Route not found");
    this.statusCode = 404;
  }

  serializeErrors(){
    return [{ message: "Not Found" }];
  }
}

module.exports = { NotFoundError }