import jsonwebtoken from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  // console.log(req.headers.authorization)
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jsonwebtoken.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) {
        res.status(403).json("Token is invalid ! ");
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).json("You are not authenticated ! ");
  }
};

const verifyTokenAndAuth = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(400).json("You are not allowed to do that !");
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      console.log(req.user.isAdmin);
      next();
    } else {
      // console.log(req.user)
      res.status(400).json("You are not allowed to do that !");
    }
  });
};

export { verifyTokenAndAdmin, verifyTokenAndAuth , verifyToken};
