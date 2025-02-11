export default function BooleanButtons({
  trueText,
  falseText,
  value,
  onChange,
}: Readonly<{
  trueText: string;
  falseText: string;
  value: boolean;
  onChange: (newValue: boolean) => void;
}>) {
  const baseClass = "border border-gray-500 px-2 py-1";
  const activeClass = "bg-red-950";

  const falseClass = `${baseClass} ${value ? "" : activeClass}`;
  const trueClass = `${baseClass} ${value ? activeClass : ""} border-l-0`;

  return (
    <div>
      <button onClick={() => onChange(false)} className={falseClass}>
        {falseText}
      </button>
      <button onClick={() => onChange(true)} className={trueClass}>
        {trueText}
      </button>
    </div>
  );
}
