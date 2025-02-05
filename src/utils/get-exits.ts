import Portal from "@/classes/Portal";

function inRange(from: Pos, to: Pos, isNether: boolean) {
	const sqRadius = isNether ? 16 : 128;
	return Math.abs(from.x - to.x) <= sqRadius && Math.abs(from.z - to.z) <= sqRadius;
}

function distance(from: Pos, to: Pos) {
	return Math.sqrt(Math.pow(from.x - to.x, 2) + Math.pow(from.y - to.y, 2) + Math.pow(from.z - to.z, 2));
}

export default function getExits(fromList: Portal[], toList: Portal[]) {
	return fromList.map(from => getExit(from, toList));
}

function getExit(fromPortal: Portal, toList: Portal[]): ExitInfo {
	let min;
	let minDist = Infinity;

	const from = fromPortal.getIdealExit();
	const nearby: [Portal, number][] = [];
	
	for (const toPortal of toList) {
		if (!inRange(from, toPortal, toPortal.isNether)) {
			continue;
		}

		const dist = distance(from, toPortal);

		if (dist < minDist) {
			min = toPortal;
			minDist = dist;
		}

		nearby.push([toPortal, dist]);
	}

	return {
		from: fromPortal,
		ideal: from,
		closest: min ? [min, minDist] : null,
		nearby: nearby
	};
}