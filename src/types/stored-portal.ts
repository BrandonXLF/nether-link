import Pos from "./pos";

export default interface StoredPortal extends Pos {
	uuid: string;
	name: string;
}
