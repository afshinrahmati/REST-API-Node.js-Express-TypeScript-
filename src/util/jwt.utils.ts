import jwt from "jsonwebtoken";
import config from "config";
const publicKey = config.get<string>("publicKey");
const privateKey = config.get<string>("privateKey");

const signJwt = (object: Object, options?: jwt.SignOptions | undefined) => {
  return jwt.sign(object, privateKey, { ...options });
};
const verifyJwt = (token: string) => {
  try {
    const decoded = jwt.verify(token, publicKey);
    return {
      valid: true,
      decoded,
      expired: false,
    };
  } catch (e: any) {
    return {
      valid: false,
      expired: e.message === "Jwt Expired",
      decoded: null,
    };
  }
};

export { signJwt, verifyJwt };
