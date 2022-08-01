import { Request } from "express";
import { logger } from "../util/logger";
import { createUser } from "../service/user.service";
import { CreateUserInput } from "../schema/user.schema";
import { omit } from "lodash";

export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput["body"]>,
  res: Response | any
) {
  try {
    const user = await createUser(req.body);
    return res.status(200).send(omit(user.toJSON(), ["password"]));
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
}
