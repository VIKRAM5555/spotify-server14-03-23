import jwt from "jsonwebtoken";
export const auth = (req, res, next) => {
  try {
    const token = req.header("auth_token");
    jwt.verify(token, process.env.PrivateKey);
    next();
  } catch (err) {
    res.status(401).send({ msg: err.message });
  }
};
