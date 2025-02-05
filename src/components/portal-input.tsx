import Portal from "@/classes/Portal";
import { FormEvent } from "react"


export default function PortalInput({ portal, portalUpdated, portalRemoved, placeholder }: Readonly<{
	portal: Portal,
	portalUpdated: (prop: keyof Portal, value: Portal[typeof prop]) => void,
	portalRemoved: () => void,
	placeholder?: string
}>) {
	function XYZChanged(key: 'x' | 'y' | 'z', e: FormEvent<HTMLInputElement>) {
		const value = (e.target as HTMLInputElement).valueAsNumber;

		if (Number.isNaN(value)) return;

		portalUpdated(key, value);
	}

	return <div>
		<input
			value={portal.name}
			onInput={e => portalUpdated('name', (e.target as HTMLInputElement).value)}
			placeholder={placeholder}
		/>
		<input type="number" defaultValue={portal.x} onChange={e => XYZChanged('x', e)} />
		<input type="number" defaultValue={portal.y} onChange={e => XYZChanged('y', e)} />
		<input type="number" defaultValue={portal.z} onChange={e => XYZChanged('z', e)} />
		<button onClick={() => portalRemoved()}>Del</button>
	</div>
}