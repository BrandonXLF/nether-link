import Portal from "@/classes/Portal";
import PortalName from "./portal-name";

export default function ExitListing({ portal, dist }: Readonly<{
    portal: Portal,
    dist: number
}>) {
    return <span>
        {' => '} <PortalName portal={portal} /> <span className="text-sm">({Math.round(dist * 10) / 10} block offset)</span>
    </span>;
}