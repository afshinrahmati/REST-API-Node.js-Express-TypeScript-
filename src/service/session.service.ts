import SessionModel, { SchemaDocument } from "../models/session.model";
import { FilterQuery } from "mongoose";
export async function createSession(userId: string, userAgent: string) {
  const session = await SessionModel.create({ user: userId, userAgent });
  return session.toJSON();
}

export async function findSession(query: FilterQuery<SchemaDocument>) {
  // @ts-ignore
  return SessionModel.find(query).lean();
}
