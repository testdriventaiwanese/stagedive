const jwt = require('jsonwebtoken');
const userModel = require('../user/userModel');

/**
 *  The Auth Checker middleware function.
 */
module.exports = (req, res, next) => {
  if (!req.headers.authheader) {
    return res.status(401).end();
  }

  // get the last part from a authorization header string like "bearer token-value"
  const token = req.headers.authheader;

  // decode the token using a secret key-phrase
  return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    // the 401 code is for unauthorized status
    if (err) { return res.status(401).end(); }

    const userId = decoded.sub;

    // check if a user exists
    return userModel.users.findById(userId, (result) => {
      if (result.length === 0) {
        return res.status(401).end();
      }

      return next();
    });
  });
};
