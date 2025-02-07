import Positioned from "./Positioned";

export default interface StoredPortal extends Positioned {
	uuid: string;
	name: string;
}
