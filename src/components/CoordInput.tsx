export default function CoordInput({ label, value, onChange }: Readonly<{
	label: string,
	value: number,
	onChange: (newValue: number) => void
}>) {
	function inputChanged(e: React.FormEvent<HTMLInputElement>) {
		const value = (e.target as HTMLInputElement).valueAsNumber;

		if (Number.isNaN(value)) return;

		onChange(value);
	}

	return <label>
		{label}: <input type="number" defaultValue={value} onChange={inputChanged} className="w-12 border-b border-white" />
	</label>;
}