export const badRequestError = (err, req, res, next) => {
  console.log("ERR ", err);
  if (err.status === 400) {
    res.status(400).send({ message: err.message, errorsList: err.errorsList });
  } else {
    next(err);
  }
};

export const unauthorizedError = (err, req, res, next) => {
  if (err.status === 401) {
    res.status(401).send({ message: "Unauthorized!" });
  } else {
    next(err);
  }
};

export const notFoundError = (err, req, res, next) => {
  if (err.status === 404) {
    res.status(404).send({ message: err.message || "Not found!" });
  } else {
    next(err);
  }
};

export const errorHandler = (err, req, res, next) => {
  console.log(err);

  res.send({ message: "This is a Server error" });
};
