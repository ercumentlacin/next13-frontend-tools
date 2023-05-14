import z from "zod";

export const userLoginSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Email is invalid"),

  password: z
    .string({
      required_error: "Password is required",
    })
    .min(3, "Password must be at least 3 characters"),
});
