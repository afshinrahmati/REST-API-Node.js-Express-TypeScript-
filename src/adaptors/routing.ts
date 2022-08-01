import express, { Express } from "express";
import validate from "../middleware/validateResource";
import { RequestMethod } from "../types/global";
import { createUserHandler } from "../controller/user.controller";
import { createUserSchema } from "../schema/user.schema";

export function routes(app: Express) {
  app.post("/api/users", validate(createUserSchema), createUserHandler);
}
