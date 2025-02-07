import Portal from "@/classes/Portal";
import Point from "@/classes/Point";

export default interface ExitInfo {
	ideal: Point,
	closest: [Portal, number] | null;
	nearby: [Portal, number][];
};