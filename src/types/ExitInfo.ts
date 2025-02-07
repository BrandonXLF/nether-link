import Portal from "@/classes/Portal";
import Positioned from "@/types/Positioned";

export default interface ExitInfo {
	ideal: Positioned,
	closest: [Portal, number] | null;
	nearby: [Portal, number][];
};