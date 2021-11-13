import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

export const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").split(" ")[1];
    const decoded = jwt.verify(token, "node-express-mongodb-mongoose-jwt");
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) throw new Error();

    req.token = token;
    req.user = user;

    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate" });
  }
};
