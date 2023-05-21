import getCurrentUser from "@/app/actions/getCurrentUser";
import { Tool, User } from "@prisma/client";
import Link from "next/link";
import HomePageButtonGroup from "../HomePage/HomePageButtonGroup";
import Tag from "../Tag/";

interface ToolCardProps {
  tool: Tool & {
    author: User;
  };
}

export default async function ToolCard({ tool }: ToolCardProps) {
  const currentUser = await getCurrentUser();
  return (
    <li
      className="flex flex-col w-full gap-4 p-4 rounded shadow-sm shadow-neutral-focus grow"
      key={tool.id}
    >
      <h3 className="text-2xl leading-3 capitalize text-primary-content">
        {tool.title}
      </h3>
      <strong className="text-sm font-medium leading-5 text-accent">
        @{tool.author.name || tool.author.email.split("@")[0]}
      </strong>
      <p className="max-w-sm text-sm leading-5">{tool.description}</p>
      <div className="flex items-center justify-between">
        <Link
          href={tool.link}
          className="btn btn-primary w-min btn-sm "
          target="_blank"
        >
          View
        </Link>

        <HomePageButtonGroup currentUser={currentUser} tool={tool} />
      </div>
      <div className="flex flex-wrap gap-2 mt-auto">
        {tool.tags.map((tag) => (
          <Tag key={tag} tag={tag} />
        ))}
      </div>
    </li>
  );
}
