import metadata from "@/metadata";
import Box from "./Box";

export default function MainHeading() {
	return <hgroup className="relative border-b border-gray-500 bg-red-950 min-h-20">
		<Box level={1} title={metadata.title} className="relative z-10">
			<p>{metadata.description}</p>
		</Box>
		<div className="absolute h-full left-full top-0">
			<svg className="absolute h-full right-full" viewBox="0 0 25 10">
				<rect className="stroke-black stroke-[5] fill-none" x="5" y="5" width="15" height="25" />
				<rect className="fill-purple-950" x="7.5" y="7.5" width="10" height="20" />
			</svg>
		</div>
	</hgroup>;
}