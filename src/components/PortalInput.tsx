import ExitInfo from "@/types/ExitInfo";
import { FormEvent } from "react"
import CompResult from "./CompResult";
import Portal from "@/types/Portal";
import { showPoint } from "@/utils/pointUtils";

export default function PortalInput({ data, exitInfo, isNew, portalUpdated, portalRemoved }: Readonly<{
	data: Portal,
	exitInfo: ExitInfo,
	isNew?: boolean,
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
			value={data.name}
			onInput={e => portalUpdated('name', (e.target as HTMLInputElement).value)}
			title="Label"
			placeholder={isNew ? 'Add portal...' : 'Label'}
			className={`w-28 ${data.isNether ? "text-red-400" : "text-green-300"}`}
		/>
		<div>
			<div className="flex items-start gap-3">
				<div>
					<div className="flex gap-2">
						<label>
							x: <input type="number" defaultValue={data.x} onChange={e => XYZChanged('x', e)} className="w-12 border-b border-white" />
						</label>
						<label>
							y: <input type="number" defaultValue={data.y} onChange={e => XYZChanged('y', e)} className="w-12 border-b border-white" />
						</label>
						<label>
							z: <input type="number" defaultValue={data.z} onChange={e => XYZChanged('z', e)} className="w-12 border-b border-white" />
						</label>
					</div>
					{exitInfo && <div className="pt-1">
						{data.isNether ? 'Overworld' : 'Nether'}: {showPoint(exitInfo.ideal)}
					</div>}
				</div>
				<span className="inline-flex gap-4 pl-2">
					{!isNew && <button onClick={() => portalRemoved()}>&times;</button>}
				</span>
			</div>
			{exitInfo && <div className="pt-1">
				<CompResult exitInfo={exitInfo} />
			</div>}
		</div>
	</div>
}