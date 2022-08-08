import SessionModel, { SessionDocument } from "../models/session.model";
import { FilterQuery, UpdateQuery } from "mongoose";
import { signJwt, verifyJwt } from "../util/jwt.utils";
import { get } from "lodash";
import { findUser } from "./user.service";
import config from "config";
export async function createSession(userId: string, userAgent: string) {
  const session = await SessionModel.create({ user: userId, userAgent });
  return session.toJSON();
}

export async function findSession(query: FilterQuery<SessionDocument>) {
  // @ts-ignore
  return SessionModel.find(query).lean();
}

export async function updateSession(
  query: FilterQuery<SessionDocument>,
  update: UpdateQuery<SessionDocument>
) {
  return SessionModel.updateOne(query as any, update);
}

export async function reIssueAccessToken({
  refreshToken,
}: {
  refreshToken: string;
}) {
  const { decoded } = verifyJwt(refreshToken);

  const _id = get(decoded, "_id");

  if (!decoded || !_id) return false;

  const session: any = await SessionModel.findById(get(decoded, "session"));

  if (!session || !session.valid) return false;

  const user = await findUser({ _id: session.user });

  if (!user) return user;

  const accessToken = signJwt(
    { ...user, session: session._id },
    { expiresIn: config.get("accessTokenTtl") }
  );
  return accessToken;
}
