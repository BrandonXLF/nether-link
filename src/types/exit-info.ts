import Portal from "@/classes/Portal";
import Pos from "./pos";

export default interface ExitInfo {
	ideal: Pos,
	closest: [Portal, number] | null;
	nearby: [Portal, number][];
};