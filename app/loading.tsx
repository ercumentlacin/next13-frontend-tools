import { ImSpinner2 } from "react-icons/im";

export default function HomePageLoading() {
  return (
    <div className="absolute inset-0 flex items-center justify-center w-full h-full bg-opacity-50 bg-base-100">
      <ImSpinner2 className="w-6 h-6 animate-spin" />
    </div>
  );
}
