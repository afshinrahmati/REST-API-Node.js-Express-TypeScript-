import { object, string } from "zod";
export const createSessionSchema = object({
  body: object({
    email: string({
      required_error: "Email Is Required",
    }).email(),
    password: string({
      required_error: "Password Is Required",
    }),
  }),
});
