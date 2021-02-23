function methodNotAllowed(req, res, next) {
  next({
    status: 405,
    errors: [`${req.method} not allowed for ${req.originalUrl}`],
  });
}

module.exports = methodNotAllowed;
