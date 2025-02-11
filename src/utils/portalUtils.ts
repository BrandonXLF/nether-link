import Portal from "@/types/Portal";
import { showPoint } from "./pointUtils";
import Point from "@/types/Point";

let lastId = 0;

export function nextPortalId() {
	lastId++;
	return `p-${lastId}`;
}

export function makeBlankPortal(isNether = false): Portal {
	return {
		x: 0,
		y: 0,
		z: 0,
		name: '',
		isNether
	};
}

function overworldToNether(c: number) {
	return Math.floor(c / 8);
}

function netherToOverworld(c: number) {
	return c * 8;
}

export function getIdealExit(portal: Portal) {
	if (portal.isNether) {
		return {
			x: netherToOverworld(portal.x),
			y: portal.y,
			z: netherToOverworld(portal.z)
		};
	}

	return {
		x: overworldToNether(portal.x),
		y: portal.y,
		z: overworldToNether(portal.z)
	};
}

export function getOverworldPos(portal: Portal): Point {
	return portal.isNether
		? getIdealExit(portal)
		: portal;
}

export function showPortal(portal: Portal) {
	const coordStr = showPoint(portal);

	return portal.name
		? `${portal.name} (${coordStr})`
		: coordStr;
}