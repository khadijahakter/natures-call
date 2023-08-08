const { ForbiddenError, NotFoundError } = require("../errors");

const forbiddenErrorHandler = (err, req, res, next) => {
  if (err instanceof ForbiddenError) {
    return res.status(403).json({ message: err.message });
  }
  next(err);
};

const notFoundErrorHandler = (err, req, res, next) => {
  if (err instanceof NotFoundError) {
    return res.status(404).json({ message: err.message });
  }
  next(err);
};

module.exports = {
  forbiddenErrorHandler,
  notFoundErrorHandler,
};