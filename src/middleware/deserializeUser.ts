import { Request, Response, NextFunction } from "express";
import { get } from "lodash";
import config from "config";
import { verifyJwt } from "../util/jwt.utils";
import { reIssueAccessToken } from "../service/session.service";
const publicKey = config.get<string>("publicKey");
const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = get(req, "headers.authorization", "").replace(
    /^Bearer\s/,
    ""
  );

  const refreshToken = get(req, "headers.x-refresh");

  if (!accessToken) return next();
  const { decoded, expired, valid } = verifyJwt(accessToken);

  if (decoded) {
    res.locals.user = decoded;
    return next();
  }

  if (expired && refreshToken) {
    const newAccessToken: any = await reIssueAccessToken({ refreshToken });
    
    if (newAccessToken) {
      res.setHeader("x-access-token", newAccessToken);
    }
    const result = verifyJwt(newAccessToken);

    res.locals.user = result.decoded;
    return next();
  }
  return next();
};
export default deserializeUser;
