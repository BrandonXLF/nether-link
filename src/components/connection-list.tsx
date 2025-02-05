import Portal from "@/classes/Portal";
import ExitInfo from "@/types/exit-info";
import Mapping from "./mapping";

export default function ConnectionList({ overworldExits, netherExits }: Readonly<{
    overworldExits: Map<Portal, ExitInfo>,
    netherExits: Map<Portal, ExitInfo>
}>) {
    const mappings = [];
    const bidirectionalNether = new Set<Portal>();

    for (const [from, exit] of overworldExits) {
        const bidirectional = exit.closest ? netherExits.get(exit.closest[0])?.closest?.[0] == from : false;

        if (bidirectional) {
            bidirectionalNether.add(exit.closest![0]);
        }

        mappings.push(<Mapping fromPortal={from} toPortal={exit.closest?.[0]} bidirectional={bidirectional} />);
    }

    for (const [from, exit] of netherExits) {
        if (bidirectionalNether.has(from)) continue;

        mappings.push(<Mapping fromPortal={exit.closest?.[0]} toPortal={from} reverse={true} />);
    }

    return <ul>
        {mappings.map(mapping => <li>{mapping}</li>)}
    </ul>;
}