import StoredPortal from "@/types/StoredPortal";
import Positioned from "@/types/Positioned";

export default class Portal implements Positioned {
	static fromStored(stored: StoredPortal, isNether: boolean) {
		return new Portal(stored.uuid, stored.name, stored.x, stored.y, stored.z, isNether);
	}

	static newBlank(isNether: boolean) {
		return new Portal(crypto.randomUUID(), '', 0, 0, 0, isNether);
	}

	public constructor(
		public uuid: string,
		public name: string,
		public x: number,
		public y: number,
		public z: number,
		public isNether: boolean
	) {

	}

	private overworldToNether(c: number) {
		return Math.floor(c / 8);
	}

	private netherToOverworld(c: number) {
		return c * 8;
	}

	public getIdealExit(): Positioned {
		if (this.isNether) {
			return {
				x: this.netherToOverworld(this.x),
				y: this.y,
				z: this.netherToOverworld(this.z)
			};
		}

		return {
			x: this.overworldToNether(this.x),
			y: this.y,
			z: this.overworldToNether(this.z)
		};
	}

	public getOverworldPos(): Positioned {
		return this.isNether ? this.getIdealExit() : this;
	}

	toStored(): StoredPortal {
		return {
			uuid: this.uuid,
			name: this.name,
			x: this.x,
			y: this.y,
			z: this.z
		};
	}

	toJSON() {
		return this.toStored();
	}
}