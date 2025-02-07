import Positioned from "@/types/Positioned";

export default class Point implements Positioned {
	public constructor(
		public x: number,
		public y: number,
		public z: number,
	) { }

	toString() {
		return `${this.x}, ${this.y}, ${this.z}`;
	}
}