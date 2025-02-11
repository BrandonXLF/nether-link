import Mapping from "./Mapping";
import { useAppSelector } from "@/store/hooks";
import {
  selectNetherExits,
  selectOverworldExits,
} from "@/store/selectExitMaps";

export default function ConnectionList() {
  const overworldExits = useAppSelector(selectOverworldExits);
  const netherExits = useAppSelector(selectNetherExits);

  const mappings: Record<string, React.ReactElement> = {};
  const bidirectionalNether = new Set<string>();

  for (const [id, exit] of Object.entries(overworldExits)) {
    const bidirectional = exit.closest
      ? netherExits[exit.closest[0]]?.closest?.[0] == id
      : false;

    if (bidirectional) {
      bidirectionalNether.add(exit.closest![0]);
    }

    const key = `${id}&${exit.closest?.[0]}`;
    mappings[key] = (
      <Mapping
        fromPortal={exit.portal}
        toPortal={exit.closest?.[1]}
        bidirectional={bidirectional}
      />
    );
  }

  for (const [id, exit] of Object.entries(netherExits)) {
    if (bidirectionalNether.has(id)) continue;

    const key = `${exit.closest?.[0]}&${id}`;
    mappings[key] = (
      <Mapping
        fromPortal={exit.closest?.[1]}
        toPortal={exit.portal}
        reverse={true}
      />
    );
  }

  return (
    <div>
      <ul className="inline-grid grid-cols-[auto_1fr_1fr_1fr_auto]">
        {Object.entries(mappings).map(([key, mapping]) => {
          return (
            <li key={key} className="contents">
              {mapping}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
