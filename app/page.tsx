import Link from "next/link";
import { redirect } from "next/navigation";
import getTools from "./actions/getTools";
import ToolCard from "./components/ToolCard/";
import clsxm from "./utils/clsxm";

interface HomeProps {
  searchParams: {
    page: string | undefined;
  };
}

export default async function Home({ searchParams }: HomeProps) {
  const currenPage = searchParams.page ? parseInt(searchParams.page) : 1;

  if (!searchParams.page || isNaN(currenPage) || currenPage < 1)
    redirect("/?page=1");

  const { tools, haveNextPage, havePreviousPage } = await getTools({
    limit: 6,
    skip: (currenPage - 1) * 6,
  });

  const pagination = [
    {
      name: "Previous",
      disabled: !havePreviousPage,
    },
    {
      name: "Next",
      disabled: !haveNextPage,
    },
  ];

  return (
    <main className="container w-full mx-auto sm:p-8 max-w-7xl">
      <ul className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] w-full">
        {tools.map((tool) => (
          // @ts-expect-error Async Server Component
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </ul>

      <div className="flex justify-center w-full gap-4 mt-8">
        {pagination.map(({ name, disabled }) => (
          <Link
            key={name}
            className={clsxm(
              "px-4 py-2 text-lg font-semibold text-white rounded-md shadow-md bg-accent hover:bg-accent-hover focus:outline-none focus:ring-2 focus:ring-accent",
              disabled && "opacity-50 cursor-not-allowed pointer-events-none"
            )}
            aria-disabled={disabled}
            href={{
              pathname: "/",
              query: {
                page: name === "Previous" ? currenPage - 1 : currenPage + 1,
              },
            }}
          >
            {name}
          </Link>
        ))}
      </div>
    </main>
  );
}
