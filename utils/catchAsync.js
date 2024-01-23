//catchAsync is a higher order function.. higher order func is a func which has argument a func and returns a func
//The term "wrap" often comes up when dealing with higher-order functions.
//catchAsync is wrapping createTour
//Specifically, catchAsync is used to "wrap" an asynchronous function, adding error-handling functionality to it.
//can be thought somewhat as extension method adding additionl catch functionality
module.exports = (fn) => (req, res, next) => {
  fn(req, res, next).catch((err) => next(err));

  //similar to
  //fn(req, res, next).catch(next);
};
