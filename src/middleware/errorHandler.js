import { ValidationError } from 'express-validation';

const errorHandler = (error, req, res, next) => {
  if (error instanceof ValidationError) {
    return res.status(error.statusCode).json({
      name: error.name,
      message: "Validation Failed",
      statusCode: error.statusCode,
      error: "Bad Request",
      details: error.details,
    });
  }
  return res.status(500).json({
    message: 'Internal Server Error'
  });
};

export default errorHandler;
