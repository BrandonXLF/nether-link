import Portal from "@/classes/Portal";
import ExitInfo from "@/types/exit-info";
import { FormEvent, useState } from "react"
import CompResult from "./comp-result";

export default function PortalInput({ portal, exitInfo, isNew, portalUpdated, portalRemoved }: Readonly<{
	portal: Portal,
	exitInfo: ExitInfo,
	isNew?: boolean,
	portalUpdated: (prop: keyof Portal, value: Portal[typeof prop]) => void,
	portalRemoved: () => void
}>) {
	const [showAll, setShowAll] = useState(false);

	function XYZChanged(key: 'x' | 'y' | 'z', e: FormEvent<HTMLInputElement>) {
		const value = (e.target as HTMLInputElement).valueAsNumber;

		if (Number.isNaN(value)) return;

		portalUpdated(key, value);
	}

	return <span>
		<input
			value={portal.name}
			onInput={e => portalUpdated('name', (e.target as HTMLInputElement).value)}
			placeholder={isNew ? 'Add portal...' : ''}
			className={`w-28 ${portal.isNether ? "text-red-900" : "text-green-700"}`}
		/>
		x: <input type="number" defaultValue={portal.x} onChange={e => XYZChanged('x', e)} className="w-12 border-b border-black" />
		y: <input type="number" defaultValue={portal.y} onChange={e => XYZChanged('y', e)} className="w-12 border-b border-black" />
		z: <input type="number" defaultValue={portal.z} onChange={e => XYZChanged('z', e)} className="w-12 border-b border-black" />
		<span className="inline-flex gap-2 pl-2">
			{exitInfo && <button className="border rounded-md px-2 py-1" onClick={() => setShowAll(!showAll)}>{showAll ? 'Show exit' : 'Show in-range'}</button>}
			{!isNew && <button className="border rounded-md px-2 py-1" onClick={() => portalRemoved()}>Delete</button>}
		</span>
		{exitInfo && <CompResult exitInfo={exitInfo} showAll={showAll} />}
	</span>
}