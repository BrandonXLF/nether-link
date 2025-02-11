import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { load } from "@/store/portalSlice";
import StoredPortalStore from "@/types/StoredPortalStore";
import { loadArray, toSaveable } from "@/utils/portalStoreUtils";
import { useCallback } from "react";

export default function FileIO() {
  const portals = useAppSelector((state) => state.portals);
  const dispatch = useAppDispatch();

  const download = useCallback(() => {
    const a = document.createElement("a");

    const storedStore = {
      overworld: toSaveable(portals.overworld),
      nether: toSaveable(portals.nether),
    } satisfies StoredPortalStore;
    const file = new Blob([JSON.stringify(storedStore, undefined, "\t")], {
      type: "application/json",
    });

    a.href = URL.createObjectURL(file);
    a.download = "nether-links.json";

    a.click();
    URL.revokeObjectURL(a.href);
  }, [portals]);

  const upload = useCallback(() => {
    const input = document.createElement("input");
    input.type = "file";

    input.addEventListener("change", async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      const text = await file.text();
      const storedStore = JSON.parse(text) as StoredPortalStore;
      const store = {
        overworld: loadArray(storedStore.overworld, false),
        nether: loadArray(storedStore.nether, true),
      };

      dispatch(load({ store }));
    });

    input.click();
  }, [dispatch]);

  const className = "border border-gray-500 px-2 py-1 hover:bg-red-950";

  return (
    <div className="flex gap-2">
      <button onClick={download} className={className}>
        Download
      </button>
      <button onClick={upload} className={className}>
        Upload
      </button>
    </div>
  );
}
