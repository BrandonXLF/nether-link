import Portal from "@/classes/Portal";
import Pos from "./pos";

export default interface ExitInfo {
	from: Portal,
	ideal: Pos,
	closest: [Portal, number] | null;
	nearby: [Portal, number][];
};