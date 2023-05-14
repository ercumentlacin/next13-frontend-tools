import getTools from "./actions/getTools";
import ToolCard from "./components/ToolCard/";

export default async function Home() {
  const tools = await getTools();

  return (
    <main className="flex flex-col items-start justify-start min-h-screen px-4 pt-20">
      <ul className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(24rem,1fr))] w-full">
        {tools.map((tool) => (
          // @ts-expect-error Async Server Component
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </ul>
    </main>
  );
}
