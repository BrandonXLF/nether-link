import { useState } from "react";
import PortalInput from "./portal-input";
import Portal from "@/classes/Portal";
import ExitInfo from "@/types/ExitInfo";

export default function PortalList({ portals, getExits, portalsChanged, isNether }: Readonly<{
	portals: Portal[],
	getExits: () => Iterator<ExitInfo>,
	portalsChanged: (newList: Portal[]) => void,
	isNether: boolean
}>) {
	const [nextPortal, setNextPortal] = useState<Portal>(
		Portal.newBlank(isNether)
	);

	const exits = getExits();

	return <div>{[...portals, nextPortal].map(portal => {
		const exitInfo = exits.next().value;
		const isNew = portal === nextPortal;

		return <div key={portal.uuid} className="mb-4">
			<PortalInput
				portal={portal}
				exitInfo={exitInfo}
				isNew={isNew}
				portalUpdated={(prop, value) => {
					const newPortals = [...portals];
					
					if (isNew) {
						newPortals.push(nextPortal);
						nextPortal[prop] = value;

						setNextPortal(Portal.newBlank(isNether));
					} else {
						portal[prop] = value;
					}

					portalsChanged(newPortals);
				}}
				portalRemoved={() => {
					const newPortals = portals.filter(iPortal => iPortal.uuid !== portal.uuid);
					portalsChanged(newPortals);
				}}
			/>
		</div>
	})}</div>;
}