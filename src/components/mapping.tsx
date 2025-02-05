import Portal from "@/classes/Portal";
import PortalName from "./portal-name";

export default function Mapping({ fromPortal, toPortal, bidirectional, reverse }: Readonly<{
    fromPortal?: Portal,
    toPortal?: Portal,
    bidirectional?: boolean,
    reverse?: boolean
}>) {
    return <span>
        {fromPortal ? <PortalName portal={fromPortal} /> : <em>New portal</em>}
        {bidirectional ? ' <=> ' : (reverse ? ' <= ' : ' => ')}
        {toPortal ? <PortalName portal={toPortal} /> : <em>New portal</em>}
    </span>;
}