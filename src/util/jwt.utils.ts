import jwt from "jsonwebtoken";
import config from "config";
const publicKey = config.get<string>("publicKey");
const privateKey = config.get<string>("privateKey");

const signJwt = (object: Object, options?: jwt.SignOptions | undefined) => {
  return jwt.sign(object, privateKey, { ...options, algorithm: "RS256" });
};
const verifyJwt = () => {};

export { signJwt, verifyJwt };
