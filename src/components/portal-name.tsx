import Point from "@/classes/Point";
import Portal from "@/classes/Portal";

export default function PortalName({ portal }: Readonly<{ portal: Portal }>) {
    const color = portal.isNether ? "text-red-900" : "text-green-700";

    if (!portal.name) {
        return <span className={color}>{portal.toString()}</span>;
    }

    return <span>
        <span className={color}>{portal.name}</span> <span className="text-sm">({Point.prototype.toString.call(portal)})</span>
    </span>;
}