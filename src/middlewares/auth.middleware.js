const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
   try{
    const token = req.cookies.token;

    if (!token){
      const error = new Error("Unauthorized");
      error.statusCode = 401;
      throw error;
    }

  
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch(err) {
    err.statusCode = 401;
    next(err);
  }
};