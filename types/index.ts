import { User } from "@prisma/client";
import { ZodError } from "zod";

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};

export type BaseResponse = {
  message: string;
  success: boolean;
};

export type NewToolResponse =
  | (BaseResponse & {
      error: ZodError;
      path: string | number;
    })
  | BaseResponse;
