import Portal from "@/classes/Portal";
import ExitInfo from "@/types/ExitInfo";
import { FormEvent } from "react"
import CompResult from "./comp-result";

export default function PortalInput({ portal, exitInfo, isNew, showExitOnly, portalUpdated, portalRemoved }: Readonly<{
	portal: Portal,
	exitInfo: ExitInfo,
	isNew?: boolean,
	showExitOnly?: boolean,
	portalUpdated: (prop: keyof Portal, value: Portal[typeof prop]) => void,
	portalRemoved: () => void
}>) {
	function XYZChanged(key: 'x' | 'y' | 'z', e: FormEvent<HTMLInputElement>) {
		const value = (e.target as HTMLInputElement).valueAsNumber;

		if (Number.isNaN(value)) return;

		portalUpdated(key, value);
	}

	return <div className="flex items-start">
		<input
			value={portal.name}
			onInput={e => portalUpdated('name', (e.target as HTMLInputElement).value)}
			title="Label"
			placeholder={isNew ? 'Add portal...' : 'Label'}
			className={`w-28 ${portal.isNether ? "text-red-400" : "text-green-300"}`}
		/>
		<div>
			<div className="flex items-start gap-3">
				<div>
					<div className="flex gap-2">
						<label>
							x: <input type="number" defaultValue={portal.x} onChange={e => XYZChanged('x', e)} className="w-12 border-b border-white" />
						</label>
						<label>
							y: <input type="number" defaultValue={portal.y} onChange={e => XYZChanged('y', e)} className="w-12 border-b border-white" />
						</label>
						<label>
							z: <input type="number" defaultValue={portal.z} onChange={e => XYZChanged('z', e)} className="w-12 border-b border-white" />
						</label>
					</div>
					{exitInfo && <div className="pt-1">
						{portal.isNether ? 'Overworld' : 'Nether'}: {exitInfo.ideal.toString()}
					</div>}
				</div>
				<span className="inline-flex gap-4 pl-2">
					{!isNew && <button className="border px-2 py-1" onClick={() => portalRemoved()}>Delete</button>}
				</span>
			</div>
			{exitInfo && <div className="pt-1">
				<CompResult exitInfo={exitInfo} showExitOnly={showExitOnly} />
			</div>}
		</div>
	</div>
}