import ExitInfo from "@/types/exit-info";
import { useState } from "react";

export default function CompResult({ exitInfo: { from, ideal, closest, nearby } }: Readonly<{
	exitInfo: ExitInfo
}>) {
	const [showAll, setShowAll] = useState(false);
	const targetNode = closest?.[0].name ?? <i>New portal around {ideal.x}, {ideal.y}, {ideal.z}</i>;

	let allOutput = <></>;

	if (showAll && closest) {
		nearby.sort((a, b) => {
			return a[1] - b[1];
		});

		allOutput = <ul>
			{nearby.map(([portal, dist]) => {
				return <li key={portal.uuid} className="pl-4">{portal.name} <span className="text-sm"> ({Math.round(dist * 10) / 10} block offset)</span></li>;
			})}
		</ul>;
	}

	return <div>
		{from.name} {'=>'} {targetNode}{
		closest
			? <>
				<span className="text-sm"> ({Math.round(closest[1] * 10) / 10} block offset)</span>{' '}
				<button onClick={() => setShowAll(!showAll)}>{showAll ? 'Show less' : 'Show in-range'}</button>
			</>
			: ''
		}
		
		{allOutput}
	</div>;
}