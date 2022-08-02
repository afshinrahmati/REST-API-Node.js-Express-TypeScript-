import { Express } from "express";
import validate from "../middleware/validateResource";
import { createUserHandler } from "../controller/user.controller";
import { createUserSchema } from "../schema/user.schema";
import {
  createUserSessionHandler,
  getUserSessionHandler,
} from "../controller/session.controller";
import { createSessionSchema } from "../schema/session.schema";

export function routes(app: Express) {
  app.post("/api/users", validate(createUserSchema), createUserHandler);
  app.post(
    "/api/sessions",
    validate(createSessionSchema),
    createUserSessionHandler
  );
  app.get("/api/sessions", getUserSessionHandler);
}
