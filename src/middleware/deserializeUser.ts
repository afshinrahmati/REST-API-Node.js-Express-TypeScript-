import { Request, Response, NextFunction } from "express";
import { get } from "lodash";
import { verifyJwt } from "../util/jwt.utils";
const deserializeUser = (req: Request, res: Response, next: NextFunction) => {
  const accessToken = get(req, "headers.authorization", "").replace(
    /^Bearer\s/,
    ""
  );
  if (!accessToken) return next();
  const { decoded, expired, valid } = verifyJwt(accessToken);
  if (decoded) {
    res.locals.user = decoded;
    return next();
  }
  return next();
};
export default deserializeUser;
