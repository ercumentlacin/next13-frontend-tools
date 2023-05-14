interface TagProps {
  tag: string;
}

export default function Tag({ tag }: TagProps) {
  return (
    <span
      className="px-2 py-1 text-xs font-medium leading-4 text-white bg-gray-800 rounded"
      key={tag}
    >
      {tag}
    </span>
  );
}
