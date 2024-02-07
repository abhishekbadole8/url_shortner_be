const jwt = require("jsonwebtoken");

const authTokenHandler = async (req, res, next) => {
  try {
    let authHandler = req.headers.authorization || req.headers.Authorization;

    if (authHandler && authHandler.startsWith("Bearer")) {
      let token = authHandler.split(" ")[1];
      if (!token) {
        return res
          .status(400)
          .json({ error: "user is not authorized or token is missing" });
      }
      
      await jwt.verify(token, process.env.JWT_SECRET, (error, decode) => {
        if (error) {
          return res.status(401).json({ error: "user is not authorized" });
        }
        
        req.id = decode.id;
        next();
      });
    } else {
      return res.status(400).json({ error: "invalid token formate" });
    }
  } catch (error) {
    return res.status(500).json({ error: "internal server error" });
  }
};

module.exports = authTokenHandler;
