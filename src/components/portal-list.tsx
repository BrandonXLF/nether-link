import { useState } from "react";
import PortalInput from "./portal-input";
import Portal from "@/classes/Portal";

export default function PortalList({ portals, portalsChanged, isNether }: Readonly<{
	portals: Portal[],
	portalsChanged: (newList: Portal[]) => void,
	isNether: boolean
}>) {
	const [nextPortal, setNextPortal] = useState<Portal>(
		Portal.newBlank(isNether)
	);

	return <div>{[...portals, nextPortal].map(portal => {
		const isNew = portal === nextPortal;

		return <PortalInput
			key={portal.uuid}
			portal={portal}
			placeholder={isNew ? 'Add portal...' : ''}
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
	})}</div>;
}