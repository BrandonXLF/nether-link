export default function MainHeading() {
	return <hgroup className="relative border-b border-gray-400 bg-red-950 min-h-20">
		<div className="absolute h-full left-full">
		<svg className="absolute h-full right-full" viewBox="0 0 25 10">
			<rect className="stroke-black stroke-[5] fill-none" x="5" y="5" width="15" height="25" />
			<rect className="fill-purple-950" x="7.5" y="7.5" width="10" height="20" />
		</svg>
		</div>
		<div className="relative p-4 z-10">
		<h1 className="text-3xl font-semibold mb-2">Nether Link</h1>
		<p>Coordinate Minecraft Nether portals.</p>
		</div>
	</hgroup>;
}