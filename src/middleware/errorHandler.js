// import { ValidationError } from 'express-validation';

// const errorHandler = (error, req, res, next) => {
//   console.error(error); // Log the full error details for debugging

//   if (error instanceof ValidationError) {
//     return res.status(error.statusCode).json({
//       name: error.name,
//       message: "Validation Failed",
//       statusCode: error.statusCode,
//       error: "Bad Request",
//       details: error.details,
//     });
//   }
//   return res.status(500).json({
//     message: 'Internal Server Error',
//     details: error.message, // Add error message for more context
//   });
// };

// export default errorHandler;

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
  return res.status(400).send(error.message);
};

export default errorHandler;