export default function mapXZ(portals: Portal[], op: (xz: number) => number) {
	return portals.map(portal => ({
		...portal,
		x: op(portal.x),
		z: op(portal.z),
	}))
}