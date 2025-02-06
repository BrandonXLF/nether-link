import Pos from "@/types/pos";

export default function Coord({ pos }: Readonly<{pos: Pos}>) {
	return <span>{pos.x}, {pos.y}, {pos.z}</span>;
}