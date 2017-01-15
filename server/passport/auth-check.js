const jwt = require('jsonwebtoken');
const userModel = require('../user/userModel');

/**
 *  The Auth Checker middleware function.
 */
module.exports = (req, res, next) => {
  if (!req.headers.authheader) {
    console.log('No request headers');
    return res.status(401).end();
  }

  // get the last part from a authorization header string like "bearer token-value"
  const token = req.headers.authheader;

  // decode the token using a secret key-phrase
  return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log('JWT token error');
      return res.status(401).end();
    }

    const userId = decoded.sub;

    // check if a user exists
    return userModel.users.findById(userId)
      .then((result) => {
      if (result.length === 0) {
        return res.status(401).end();
      }

      return next();
    });
  });
};
