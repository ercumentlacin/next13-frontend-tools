import clsxm from "@/app/utils/clsxm";
import { forwardRef } from "react";

type TextInputProps = {
  label?: string;
  labelProps?: React.ComponentPropsWithoutRef<"label">;
} & (
  | React.ComponentPropsWithRef<"input">
  | React.ComponentPropsWithoutRef<"input">
);

const TextInput: React.FC<TextInputProps> = forwardRef(
  ({ label, labelProps, ...props }, ref) => {
    return (
      <>
        {label && (
          <label
            htmlFor={props.name}
            {...labelProps}
            className={clsxm("label", labelProps?.className)}
          >
            <span className="capitalize label-text">{label}</span>
          </label>
        )}

        <input
          type="text"
          {...props}
          ref={ref}
          className={clsxm(
            "w-full max-w-xs input input-bordered",
            props.className
          )}
        />
      </>
    );
  }
);

TextInput.displayName = "TextInput";

export default TextInput;
