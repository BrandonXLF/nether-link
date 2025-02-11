import { useCallback, useState } from "react";
import PortalInput from "./PortalInput";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { add, remove, update } from "@/store/portalSlice";
import Portal from "@/types/Portal";
import { nextPortalId } from "@/utils/portalUtils";
import { portalTypeMap } from "@/store/selectExitMaps";

export default function PortalList({
  type,
  isNether,
}: Readonly<{
  type: "overworld" | "nether";
  isNether: boolean;
}>) {
  const makeNext = useCallback(
    () =>
      [
        nextPortalId(),
        {
          x: 0,
          y: 0,
          z: 0,
          name: "",
          isNether,
        },
      ] as [string, Portal],
    [isNether],
  );

  const [nextPortal, setNextPortal] = useState<[string, Portal]>(makeNext);
  const portals = useAppSelector((state) => state.portals[type]);
  const exits = useAppSelector(portalTypeMap[type]);
  const dispatch = useAppDispatch();

  return (
    <div>
      {[...Object.entries(portals), nextPortal].map(([id, portal]) => {
        const isNew = id === nextPortal[0];

        return (
          <div key={id} className="mb-4">
            <PortalInput
              data={portal}
              exitInfo={exits[id]}
              isNew={isNew}
              portalUpdated={(prop, value) => {
                if (isNew) {
                  dispatch(
                    add({
                      type,
                      id,
                      portal: {
                        ...portal,
                        [prop]: value,
                      },
                    }),
                  );

                  setNextPortal(makeNext());
                  return;
                }

                dispatch(update({ type, id, prop, value }));
              }}
              portalRemoved={() => dispatch(remove({ type, id }))}
            />
          </div>
        );
      })}
    </div>
  );
}
