import SignUpForm from "../components/Forms/SignUpForm";
import { userRegisterAction } from "./actions";

export default function NewUserPage() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <SignUpForm userRegisterAction={userRegisterAction} />
    </div>
  );
}
