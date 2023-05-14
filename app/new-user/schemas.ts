import z from "zod";
import { userLoginSchema } from "../enter/schemas";

export const userRegisterSchema = userLoginSchema.merge(
  z.object({
    username: z
      .string({
        required_error: "Username is required",
      })
      .min(3, "Username must be at least 3 characters")
      .max(20, "Username must be at most 20 characters"),
  })
);
