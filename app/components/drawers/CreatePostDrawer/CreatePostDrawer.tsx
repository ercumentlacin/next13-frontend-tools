"use client";

import { useDrawer } from "@/app/contexts/DrawerContext";
import toast from "@/app/libs/toast";
import { NewToolResponse } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import TextInput from "../../base/TextInput";
import CreatePostDrawerSchema, {
  type CreatePostDrawerSchema as TCreatePostDrawerSchema,
} from "./CreatePostDrawerSchema";

const fields: (keyof TCreatePostDrawerSchema)[] = [
  "title",
  "description",
  "link",
  "tags",
];

export default function CreatePostDrawer() {
  const { toggleDrawer, setContent } = useDrawer();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TCreatePostDrawerSchema>({
    resolver: zodResolver(CreatePostDrawerSchema),
  });

  const onSubmit: SubmitHandler<TCreatePostDrawerSchema> = async (data) => {
    try {
      const res = await fetch("/api/tools/new-tool", {
        method: "POST",
        body: JSON.stringify({
          ...data,
        }),
      });

      if (!res.ok) throw new Error("Error creating post");

      const json = (await res.json()) as NewToolResponse;

      toast(json.message, json.success ? "success" : "error");

      reset();

      setTimeout(() => {
        toggleDrawer();
        setContent("");
      }, 1000);
    } catch (error) {
      const e = error as Error;
      toast(e.message, "error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit, (errors) => console.log(errors))}
      className="flex flex-col w-full max-w-xs space-y-3"
    >
      {fields.map((field) => (
        <div key={field} className="w-full max-w-xs form-control">
          <TextInput {...register(field, { required: true })} label={field} />
          {errors[field] && (
            <div className="p-2 mt-2 text-sm rounded shadow-lg bg-error text-error-content bg-opacity-90">
              <span>{errors[field]?.message}</span>
            </div>
          )}
        </div>
      ))}

      <div className="w-full max-w-xs !mt-8 !flex gap-2 justify-end">
        <button
          type="submit"
          className="gap-2 transition duration-500 ease-in-out btn-success btn grow text-success-content hover:bg-opacity-80 hover:border-opacity-80"
        >
          Create Post
        </button>
        <button
          type="button"
          className="gap-2 transition duration-500 ease-in-out btn btn-error grow text-error-content hover:bg-opacity-80 hover:border-opacity-80"
          onClick={() => {}}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
