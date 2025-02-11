import Portal from "@/types/Portal";
import { showPoint } from "@/utils/pointUtils";
import { showPortal } from "@/utils/portalUtils";

export default function PortalName({ portal }: Readonly<{ portal: Portal }>) {
  const color = portal.isNether ? "text-red-400" : "text-green-300";

  if (!portal.name) {
    return <span className={color}>{showPortal(portal)}</span>;
  }

  return (
    <span>
      <span className={color}>{portal.name}</span>{" "}
      <span className="text-sm">({showPoint(portal)})</span>
    </span>
  );
}
