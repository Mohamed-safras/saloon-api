const NotFound = (req, res, next) => {
  const error = new Error(`Not Found: ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const UnAuthorized = (err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401);
    res.json({ message: err.name + ": " + err.message });
  } else {
    next(err);
  }
};

module.exports = {
  UnAuthorized,
  NotFound,
};
