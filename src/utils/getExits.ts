import ExitInfo from "@/types/ExitInfo";
import Portal from "@/types/Portal";
import Point from "@/types/Point";
import { getIdealExit } from "./portalUtils";

function inRange(from: Point, to: Point, isNether: boolean) {
  const sqRadius = isNether ? 16 : 128;
  return (
    Math.abs(from.x - to.x) <= sqRadius && Math.abs(from.z - to.z) <= sqRadius
  );
}

function distance(from: Point, to: Point) {
  return Math.sqrt(
    Math.pow(from.x - to.x, 2) +
      Math.pow(from.y - to.y, 2) +
      Math.pow(from.z - to.z, 2),
  );
}

export default function getExits(
  fromPortals: Record<string, Portal>,
  toPortals: Record<string, Portal>,
): Record<string, ExitInfo> {
  return Object.fromEntries(
    Object.entries(fromPortals).map(([id, from]) => [
      id,
      getExit(from, toPortals),
    ]),
  );
}

function getExit(
  fromPortal: Portal,
  toPortals: Record<string, Portal>,
): ExitInfo {
  let minId;
  let minName;
  let minDist = Infinity;

  const from = getIdealExit(fromPortal);
  const nearby: [string, Portal, number][] = [];

  for (const [toId, toPortal] of Object.entries(toPortals)) {
    if (!inRange(from, toPortal, toPortal.isNether)) {
      continue;
    }

    const dist = distance(from, toPortal);

    if (dist < minDist) {
      minId = toId;
      minName = toPortal;
      minDist = dist;
    }

    nearby.push([toId, toPortal, dist]);
  }

  return {
    portal: fromPortal,
    ideal: from,
    closest: minName ? [minId!, minName, minDist] : null,
    nearby: nearby,
  };
}
