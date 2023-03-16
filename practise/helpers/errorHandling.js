module.exports.handleError = (err, req, res, next) => {
  if (err) {
    return res.status(err.status).send({ message: err.message });
  }
  next();
};
