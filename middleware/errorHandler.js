const errorHandler = (err, req, res, next) => {
  console.log(err);
  let code = 500;
  let errMessage = `Internal Server Error`;

  switch (err.name) {
    case "SequelizeValidationError":
      code = 400;
      errMessage = err.errors[0].message;
      break;

    case "DataNotDound":
      code = 404;
      errMessage = "Data Not Found";
      break;

    case "NotComplete":
      code = 403;
      errMessage = "Cant Delete On Progress Todolist";
      break;

    default:
      break;
  }

  res.status(code).json({
    success: false,
    message: errMessage,
  });
};

module.exports = errorHandler;
