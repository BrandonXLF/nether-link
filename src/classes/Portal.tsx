import StoredPortal from "@/types/StoredPortal";
import Point from "./Point";

export default class Portal extends Point {
	static fromStored(stored: StoredPortal, isNether: boolean) {
		return new Portal(stored.uuid, stored.name, stored.x, stored.y, stored.z, isNether);
	}

	static newBlank(isNether: boolean) {
		return new Portal(crypto.randomUUID(), '', 0, 0, 0, isNether);
	}

	public constructor(
		public uuid: string,
		public name: string,
		x: number,
		y: number,
		z: number,
		public isNether: boolean
	) {
		super(x, y, z);
	}

	private overworldToNether(c: number) {
		return Math.floor(c / 8);
	}

	private netherToOverworld(c: number) {
		return c * 8;
	}

	public getIdealExit(): Point {
		if (this.isNether) {
			return new Point(
				this.netherToOverworld(this.x),
				this.y,
				this.netherToOverworld(this.z)
			);
		}

		return new Point(
			this.overworldToNether(this.x),
			this.y,
			this.overworldToNether(this.z)
		);
	}

	public getOverworldPos(): Point {
		return this.isNether ? this.getIdealExit() : this;
	}

	toString() {
		const coordStr = `${this.x}, ${this.y}, ${this.z}`;
		return this.name ? `${this.name} (${coordStr})` : coordStr;
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