import ExitInfo from "@/types/ExitInfo";
import ExitListing from "./exit-listing";

export default function CompResult({ exitInfo: { ideal, closest, nearby }, showAll }: Readonly<{
	exitInfo: ExitInfo,
	showAll?: boolean
}>) {
	if (!closest) {
		return <div>
			{'=>'} <em>New portal around {ideal.toString()}</em>
		</div>;
	}

	if (showAll) {
		nearby.sort((a, b) => {
			return a[1] - b[1];
		});

		return <ul>
			{nearby.map(([portal, dist]) => {
				return <li key={portal.uuid}>
					<ExitListing portal={portal} dist={dist} />
				</li>;
			})}
		</ul>;
	}

	return <div>
		<ExitListing portal={closest[0]} dist={closest[1]} />
	</div>;
}
