import getExits from "@/utils/getExits";
import { createSelector } from "@reduxjs/toolkit";
import { RootState } from ".";

const inputSelectors = [
	(state: RootState) => state.portals.overworld,
	(state: RootState) => state.portals.nether
];

export const selectOverworldExits = createSelector(
	inputSelectors,
	(overworld, nether) => getExits(overworld, nether)
);

export const selectNetherExits = createSelector(
	inputSelectors,
	(overworld, nether) => getExits(nether, overworld)
);

export const portalTypeMap = {
	overworld: selectOverworldExits,
	nether: selectNetherExits
};
