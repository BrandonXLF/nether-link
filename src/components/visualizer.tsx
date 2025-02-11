import { useAppSelector } from "@/store/hooks";
import { selectNetherExits, selectOverworldExits } from "@/store/selectExitMaps";
import { getOverworldPos, showPortal } from "@/utils/portalUtils";

export default function Visualizer() {
	const exitLists = [
		useAppSelector(selectOverworldExits),
		useAppSelector(selectNetherExits)
	];

	let minX = Infinity
	let maxX = -Infinity;
	let minZ = Infinity
	let maxZ = -Infinity;

	const circles = [];
	const lines = [];

	for (const exits of exitLists) {
		for (const [id, exit] of Object.entries(exits)) {
			const from = exit.portal;
			const fill = from.isNether ? 'fill-red-500' : 'fill-green-500';
			const pos = getOverworldPos(from);
			const toPos = exit.closest && getOverworldPos(exit.closest[1]);

			if (pos.x < minX) minX = pos.x;
			if (pos.x > maxX) maxX = pos.x;
			if (pos.z < minZ) minZ = pos.z;
			if (pos.z > maxZ) maxZ = pos.z;

			circles.push(
				<circle key={id} cx={pos.x} cy={pos.z} r="1.5%" className={fill}>
					<title>{showPortal(from)}</title>
				</circle>
			);

			if (toPos) {
				const control = {
					x: ((toPos.x + pos.x) / 2),
					z: ((toPos.z + pos.z) / 2) * (toPos.z > pos.z ? 0.998 : 1.002)
				};

				lines.push(
					<path
						key={id}
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
				markerWidth={(maxX - minX) / 100}
				markerHeight={(maxZ - minZ) / 100}
				markerUnits="userSpaceOnUse"
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