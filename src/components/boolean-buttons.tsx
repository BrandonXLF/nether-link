export default function BooleanButtons({ trueText, falseText, value, onChange }: Readonly<{
	trueText: string,
	falseText: string,
	value: boolean,
	onChange: (newValue: boolean) => void
}>) {
	const baseClass = 'border border-gray-500 px-2 py-1';
	const activeClass = 'bg-red-950';

	const trueClass = `${baseClass} ${value ? activeClass : ''}`;
	const falseClass = `${baseClass} ${value ? '' : activeClass} border-l-0`;

	return <div>
		<button onClick={() => onChange(true)} className={trueClass}>{trueText}</button>
		<button onClick={() => onChange(false)} className={falseClass}>{falseText}</button>
	</div>;
}