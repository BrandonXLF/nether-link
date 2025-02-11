import Point from "@/types/Point";

export function showPoint(point: Point) {
	return `${point.x}, ${point.y}, ${point.z}`;
}