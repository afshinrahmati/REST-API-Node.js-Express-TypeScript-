import { Request, Response } from "express";
import { validatePassword } from "../service/user.service";
import {
  createSession,
  findSession,
  updateSession,
} from "../service/session.service";
import { signJwt } from "../util/jwt.utils";
import config from "config";

export async function createUserSessionHandler(req: Request, res: Response) {
  const user = await validatePassword(req.body);
  if (!user) return res.status(401).send("Invalid Email Or password");

  const session: any = await createSession(
    user._id,
    req.get("user-agent") || ""
  );
  const accessToken = signJwt(
    { ...user, session: session._id },
    { expiresIn: config.get("accessTokenTtl") }
  );

  const refreshToken = signJwt(
    { ...user, session: session._id },
    { expiresIn: config.get("refreshTokenTtl") }
  );

  return res.send({ accessToken, refreshToken });
}

export async function getUserSessionHandler(req: Request, res: Response) {
  try {
    const userId = res.locals.user._id;
    const session = await findSession({ user: userId, valid: true });
    return res.send(session);
  } catch (e: any) {
    return res.status(400).send("ERROR SERVER");
  }
}

export async function deleteSessionHandler(req: Request, res: Response) {
  
  const sessionId = res.locals.user.session;
  await updateSession({ _id: sessionId }, { valid: false });
  return res.send({
    accessToken: null,
    refreshToken: null,
  });
}
