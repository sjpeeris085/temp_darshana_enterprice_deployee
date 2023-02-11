export default (err, req, res, next) => {
  // This check makes sure this is a JSON parsing issue, but it might be
  // coming from any middleware, not just body-parser:
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    //  console.error(err);
    return res.status(400).json({ message: "Invalid request body" }); // Bad request
  }
  next();
};
