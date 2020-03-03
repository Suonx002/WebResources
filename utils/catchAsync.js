//Async function, return promises. When there is an error inside async function, basically mean promises get rejected and fall into catch.
module.exports = fn => {
  return (req, res, next) => {
    fn(req, res, next).catch(err => next(err));
  };
};
