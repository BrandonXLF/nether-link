import ExitInfo from "@/types/exit-info";
import ExitListing from "./exit-listing";
import Coord from "./coord";

export default function CompResult({ exitInfo: { ideal, closest, nearby }, showAll }: Readonly<{
	exitInfo: ExitInfo,
	showAll?: boolean
}>) {
	if (!closest) {
		return <div className="pl-4">
			{'=>'} <em>New portal around <Coord pos={ideal} /></em>
		</div>;
	}

	if (showAll) {
		nearby.sort((a, b) => {
			return a[1] - b[1];
		});

		return <ul>
			{nearby.map(([portal, dist]) => {
				return <li key={portal.uuid} className="pl-4">
					<ExitListing portal={portal} dist={dist} />
				</li>;
			})}
		</ul>;
	}

	return <div className="pl-4">
		<ExitListing portal={closest[0]} dist={closest[1]} />
	</div>;
}
