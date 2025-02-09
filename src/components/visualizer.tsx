import Portal from "@/classes/Portal";
import ExitInfo from "@/types/ExitInfo";

export default function Visualizer({ exitMaps }: Readonly<{
	exitMaps: Map<Portal, ExitInfo>[]
}>) {
	let minX = Infinity
	let maxX = -Infinity;
	let minZ = Infinity
	let maxZ = -Infinity;

	const circles = [];
	const lines = [];

	for (const exits of exitMaps) {
		for (const [from, exit] of exits) {
			const fill = from.isNether ? 'fill-red-500' : 'fill-green-500';
			const pos = from.getOverworldPos();
			const toPos = exit.closest?.[0].getOverworldPos();

			if (pos.x < minX) minX = pos.x;
			if (pos.x > maxX) maxX = pos.x;
			if (pos.z < minZ) minZ = pos.z;
			if (pos.z > maxZ) maxZ = pos.z;

			circles.push(
				<circle key={from.uuid} cx={pos.x} cy={pos.z} r="1.5%" className={fill}>
					<title>{from.toString()}</title>
				</circle>
			);

			if (toPos) {
				const control = {
					x: ((toPos.x + pos.x) / 2),
					z: ((toPos.z + pos.z) / 2) * (toPos.z > pos.z ? 0.998 : 1.002)
				};

				lines.push(
					<path
						key={from.uuid}
						d={`M ${pos.x} ${pos.z} Q ${control.x} ${control.z} ${toPos.x} ${toPos.z}`}
						markerEnd="url(#arrow)"
					/>
				);
			}
		}
	}

	return <svg className="w-full bg-black aspect-square stroke-[0.5%]" viewBox={`${minX - 5}, ${minZ - 5}, ${maxX - minX + 10}, ${maxZ - minZ + 10}`}>
		<defs>
			<marker
				id="arrow"
				viewBox="0 0 10 10"
				refX="15"
				refY="5"
				markerWidth="1.5%"
				markerHeight="1.5%"
				markerUnits="strokeWidth"
				orient="auto-start-reverse"
				className="fill-slate-500"
			>
				<path d="M 0 0 L 10 5 L 0 10 z" />
			</marker>
		</defs>
		<g className="fill-none stroke-slate-500">
			{...lines}
		</g>
		<g>
			{...circles}
		</g>
	</svg>
}