import Point from "./Point";
import Portal from "./Portal";

export default interface ExitInfo {
  portal: Portal;
  ideal: Point;
  closest: [string, Portal, number] | null;
  nearby: [string, Portal, number][];
}
