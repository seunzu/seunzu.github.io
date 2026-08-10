export function StackChips({ stacks }: { stacks: string[] }) {
  return (
    <div className="flex flex-wrap gap-x-2.5 gap-y-2">
      {stacks.map((stack) => (
        <span className="stack-chip" key={stack}>
          {stack}
        </span>
      ))}
    </div>
  );
}
