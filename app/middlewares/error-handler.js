
const errorHandler = ( err, req, res, next ) => {

  const className = Object.getPrototypeOf(err.constructor).name ;

  if(className === "CustomError"){    
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  console.log(err);
  res.status(400).send({
    errors:[{ message: "Something went wrong" }]    
  });
};

module.exports = { errorHandler }