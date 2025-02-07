import Portal from "@/classes/Portal";
import ExitInfo from "@/types/ExitInfo";
import { FormEvent, useState } from "react"
import CompResult from "./comp-result";
import Coord from "./coord";

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

	return <div className="flex items-start">
		<input
			value={portal.name}
			onInput={e => portalUpdated('name', (e.target as HTMLInputElement).value)}
			placeholder={isNew ? 'Add portal...' : ''}
			className={`w-28 ${portal.isNether ? "text-red-900" : "text-green-700"}`}
		/>
		<div>
			<div className="flex items-start gap-3">
				<div>
					<div className="flex gap-2">
						<label>
							x: <input type="number" defaultValue={portal.x} onChange={e => XYZChanged('x', e)} className="w-12 border-b border-black" />
						</label>
						<label>
							y: <input type="number" defaultValue={portal.y} onChange={e => XYZChanged('y', e)} className="w-12 border-b border-black" />
						</label>
						<label>
							z: <input type="number" defaultValue={portal.z} onChange={e => XYZChanged('z', e)} className="w-12 border-b border-black" />
						</label>
					</div>
					{exitInfo && <div className="pt-1">
						{portal.isNether ? 'Overworld' : 'Nether'}: <Coord pos={exitInfo.ideal} />
					</div>}
				</div>
				<span className="inline-flex gap-2 pl-2">
					{exitInfo && <button className="border rounded-md px-2 py-1" onClick={() => setShowAll(!showAll)}>{showAll ? 'Show exit' : 'Show in-range'}</button>}
					{!isNew && <button className="border rounded-md px-2 py-1" onClick={() => portalRemoved()}>Delete</button>}
				</span>
			</div>
			{exitInfo && <div className="pt-1">
				<CompResult exitInfo={exitInfo} showAll={showAll} />
			</div>}
		</div>
	</div>
}