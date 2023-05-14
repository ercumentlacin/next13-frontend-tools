import { SignInResponse, signIn } from "next-auth/react";
import { FormEvent } from "react";
import { userLoginSchema } from "./schemas";

export const userLoginAction =
  (
    onOk?: (data: SignInResponse) => void,
    onError?: (data: SignInResponse) => void
  ) =>
  async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    const parsed = userLoginSchema.safeParse({
      username,
      email,
      password,
    });

    if (!parsed.success) {
      return {
        success: false,
        message: parsed.error.issues[0].message,
        error: parsed.error,
        status: 400,
      };
    }

    const {
      data: { email: parsedEmail, password: parsedPassword },
    } = parsed;

    try {
      signIn("credentials", {
        email: parsedEmail,
        password: parsedPassword,
        redirect: false,
      }).then((res) => {
        if (res?.ok) {
          onOk?.(res);
        } else if (res?.error) {
          onError?.(res);
        }
      });

      // const response = await fetch("/api/auth/login", {
      //   method: "POST",
      //   body: JSON.stringify({
      //     email: parsedEmail,
      //     password: parsedPassword,
      //   }),
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // });

      // const data = await response.json();

      // return data;
    } catch (error) {
      const e = error as Error;
      return {
        success: false,
        message: e.message ?? "Something went wrong",
        error,
        status: 500,
      };
    }
  };
