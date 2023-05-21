import Link from "next/link";
import { redirect } from "next/navigation";
import getCurrentUser from "../actions/getCurrentUser";
import getToolsByUserId from "../actions/getToolsByUserId";
import Tag from "../components/Tag/Tag";
import clsxm from "../utils/clsxm";

interface DashboardPageProps {
  searchParams: {
    tab: "0" | "1" | "2" | undefined;
  };
}

const tabs = [
  { name: "Created", tab: "0" },
  { name: "Liked", tab: "1" },
  { name: "Saved", tab: "2" },
];

export default async function DashboardPage({
  searchParams,
}: DashboardPageProps) {
  const currentUser = await getCurrentUser();
  const createdTools = await getToolsByUserId(currentUser?.id);

  if (!searchParams.tab) redirect("/dashboard?tab=0");

  return (
    <main className="flex flex-col w-full gap-6">
      <h1 className="text-3xl leading-6">Dashboard</h1>

      <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {tabs.map(({ tab, name }) => (
          <Link
            key={tab}
            href={`/dashboard?tab=${tab}`}
            className={clsxm(
              "flex flex-col items-center justify-center p-4 border rounded-md shadow-sm border-base-300 bg-base-200 hover:bg-base-300 transition-colors duration-200",
              searchParams.tab === tab && "bg-base-300 border-accent"
            )}
          >
            {name}
          </Link>
        ))}
      </div>

      <div className="container grid flex-wrap grid-cols-12 gap-4 mx-auto max-w-7xl">
        {createdTools
          .filter((tool) => {
            if (searchParams.tab === "0") {
              if (tool.author.id === currentUser?.id) return true;
            }

            if (searchParams.tab === "1") {
              if (tool.likes.includes(currentUser?.id as string)) return true;
            }

            if (searchParams.tab === "2") {
              if (tool.bookmarks.includes(currentUser?.id as string))
                return true;
            }

            return false;
          })
          .map((tool) => (
            <div
              key={tool.id}
              className="flex flex-col col-span-12 gap-2 p-3 border rounded-md shadow-sm border-base-300 sm:col-span-6 md:col-span-4 lg:col-span-3 bg-base-200"
            >
              <div className="flex justify-end gap-4">
                <p className="text-sm">
                  @{tool.author.name || tool.author.email.split("@")[0]}
                </p>

                <time
                  dateTime={tool.createdAt.toISOString()}
                  className="text-sm"
                >
                  {new Intl.DateTimeFormat("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }).format(tool.createdAt)}
                </time>
              </div>

              <h2 className="text-xl leading-6">{tool.title}</h2>

              <Link
                href={tool.link}
                target="_blank"
                className="link link-accent"
              >
                {tool.link}
              </Link>

              <p className="text-base leading-6">{tool.description}</p>

              <div className="flex flex-wrap gap-2">
                {tool.tags.map((tag) => (
                  <Tag key={tag} tag={tag} />
                ))}
              </div>
            </div>
          ))}
      </div>
    </main>
  );
}
