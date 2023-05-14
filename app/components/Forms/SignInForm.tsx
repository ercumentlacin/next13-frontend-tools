"use client";

import { userLoginAction } from "@/app/enter/actions";
import { SignInResponse, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ComponentProps } from "react";
import { AiFillGithub } from "react-icons/ai";
import TextInput from "../base/TextInput";

const inputFields: ComponentProps<typeof TextInput>[] = [
  {
    label: "Email",
    name: "email",
    type: "email",
    required: true,
  },
  {
    label: "Password",
    name: "password",
    type: "password",
    required: true,
  },
];

export interface SignInFormProps {
  reset?: () => void;
}

function SignInForm({ reset }: SignInFormProps) {
  const router = useRouter();
  const onOk = (res: SignInResponse) => {
    router.refresh();
  };
  return (
    <>
      <form
        onSubmit={userLoginAction(onOk)}
        className="flex flex-col w-full max-w-xs space-y-3"
      >
        {inputFields.map((props) => (
          <div key={props.name} className="w-full max-w-xs form-control">
            <TextInput {...props} />
          </div>
        ))}

        <div className="w-full max-w-xs !mt-8 form-control">
          <button type="submit" className="w-full max-w-xs btn btn-primary">
            Sign In
          </button>
        </div>
      </form>

      <div className="w-full max-w-xs !mt-8 form-control">
        <button
          type="button"
          className="w-full max-w-xs gap-2 btn"
          onClick={() => signIn("github")}
        >
          <AiFillGithub className="w-6 h-6" />
          Continue With GitHub
        </button>
      </div>
    </>
  );
}

export default SignInForm;
