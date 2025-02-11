import ExitInfo from "@/types/ExitInfo";
import CompResult from "./CompResult";
import Portal from "@/types/Portal";
import { showPoint } from "@/utils/pointUtils";
import CoordInput from "./CoordInput";

export default function PortalInput({
  data,
  exitInfo,
  isNew,
  portalUpdated,
  portalRemoved,
}: Readonly<{
  data: Portal;
  exitInfo: ExitInfo;
  isNew?: boolean;
  portalUpdated: (prop: keyof Portal, value: Portal[typeof prop]) => void;
  portalRemoved: () => void;
}>) {
  return (
    <div className="flex items-start">
      <input
        value={data.name}
        onInput={(e) =>
          portalUpdated("name", (e.target as HTMLInputElement).value)
        }
        title="Label"
        placeholder={isNew ? "Add portal..." : "Label"}
        className={`w-28 ${data.isNether ? "text-red-400" : "text-green-300"}`}
      />
      <div>
        <div className="flex items-start gap-3">
          <div>
            <div className="flex gap-2">
              <CoordInput
                label="x"
                value={data.x}
                onChange={(v) => portalUpdated("x", v)}
              />
              <CoordInput
                label="y"
                value={data.y}
                onChange={(v) => portalUpdated("y", v)}
              />
              <CoordInput
                label="z"
                value={data.z}
                onChange={(v) => portalUpdated("z", v)}
              />
            </div>
            {exitInfo && (
              <div className="pt-1">
                {data.isNether ? "Overworld" : "Nether"}:{" "}
                {showPoint(exitInfo.ideal)}
              </div>
            )}
          </div>
          <span className="inline-flex gap-4 pl-2">
            {!isNew && <button onClick={() => portalRemoved()}>&times;</button>}
          </span>
        </div>
        {exitInfo && (
          <div className="pt-1">
            <CompResult exitInfo={exitInfo} />
          </div>
        )}
      </div>
    </div>
  );
}
