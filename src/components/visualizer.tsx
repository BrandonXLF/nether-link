import ExitInfo from "@/types/exit-info";

export default function Visualizer({ exitLists }: Readonly<{
	exitLists: ExitInfo[][]
}>) {
	let minX = Infinity
	let maxX = -Infinity;
	let minZ = Infinity
	let maxZ = -Infinity;

	const circles = [];
	const lines = [];

	for (const exits of exitLists) {
		for (const exit of exits) {
			const from = exit.from;

			const fill = from.isNether ? 'fill-red-500' : 'fill-green-500';
			const pos = from.getOverworldPos();
			const toPos = exit.closest?.[0].getOverworldPos();

			if (pos.x < minX) minX = pos.x;
			if (pos.x > maxX) maxX = pos.x;
			if (pos.z < minZ) minZ = pos.z;
			if (pos.z > maxZ) maxZ = pos.z;

			circles.push(
				<circle key={from.uuid} cx={pos.x} cy={pos.z} r="1" className={fill}>
					<title>{from.name}</title>
				</circle>
			);
			
			if (toPos) {
				lines.push(<line key={from.uuid} x1={pos.x} y1={pos.z} x2={toPos.x} y2={toPos.z} markerEnd="url(#arrow)" className="stroke-slate-500" />);
			}
		}
	}

	return <svg className="max-w-96" viewBox={`${minX - 5}, ${minZ - 5}, ${maxX - minX + 10}, ${maxZ - minZ + 10}`}>
		<marker
			id="arrow"
			viewBox="0 0 10 10"
			refX="5"
			refY="5"
			markerWidth="3"
			markerHeight="3"
			orient="auto-start-reverse"
		>
			<path d="M 0 0 L 10 5 L 0 10 z" />
		</marker>
		<g>
			{...lines}
		</g>
		<g>
			{...circles}
		</g>
	</svg>
}