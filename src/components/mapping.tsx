import Portal from "@/types/Portal";
import PortalName from "./PortalName";

export default function Mapping({ fromPortal, toPortal, bidirectional, reverse }: Readonly<{
    fromPortal?: Portal,
    toPortal?: Portal,
    bidirectional?: boolean,
    reverse?: boolean
}>) {
    return <>
        <span className="pr-3">
            {fromPortal ? <PortalName portal={fromPortal} /> : <em>New portal</em>}
        </span>
        <span>{(bidirectional || !reverse) ? '<' : ''}</span>
        <span>=</span>
        <span>{(bidirectional || reverse) ? '>' : ''}</span>
        <span className="pl-3">
            {toPortal ? <PortalName portal={toPortal} /> : <em>New portal</em>}
        </span>
    </>;
}