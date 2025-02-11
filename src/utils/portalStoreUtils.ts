import Portal from "@/types/Portal";
import StoredPortal from "@/types/StoredPortal";
import { nextPortalId } from "./portalUtils";

export function toSaveable(list: Record<string, Portal>): StoredPortal[] {
  return Object.entries(list).map(([, portal]) => ({
    x: portal.x,
    y: portal.y,
    z: portal.z,
    name: portal.name,
  }));
}

export function loadArray(
  storedArr: StoredPortal[],
  isNether: boolean,
): Record<string, Portal> {
  const portalList: Record<string, Portal> = {};

  for (const storedPortal of storedArr) {
    portalList[nextPortalId()] = { ...storedPortal, isNether };
  }

  return portalList;
}
