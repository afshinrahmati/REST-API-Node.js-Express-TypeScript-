import { object, string, number, TypeOf } from "zod";

export const createUserSchema = object({
  body: object({
    name: string({
      required_error: "Name Is Required",
    }),
    password: string({
      required_error: "Password Is Required",
    }),
    passwordConfirmation: string({
      required_error: "PasswordConfirmation Is Required",
    }),
    email: string({
      required_error: "Email Is Required",
    }).email("Email Is Required"),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: "Password Do Not Match",
    path: ["passwordConfirmation"],
  }),
});
export type CreateUserInput = TypeOf<typeof createUserSchema>;
