import ExitInfo from "@/types/ExitInfo";
import ExitListing from "./ExitListing";
import { showPoint } from "@/utils/pointUtils";
import { useAppSelector } from "@/store/hooks";

export default function CompResult({
  exitInfo: { ideal, closest, nearby },
}: Readonly<{
  exitInfo: ExitInfo;
}>) {
  const showAll = useAppSelector((state) => state.options.showAll);

  if (!closest) {
    return (
      <div>
        {"=>"} <em>New portal around {showPoint(ideal)}</em>
      </div>
    );
  }

  if (!showAll) {
    return (
      <div>
        <ExitListing portal={closest[1]} dist={closest[2]} />
      </div>
    );
  }

  nearby.sort((a, b) => {
    return a[2] - b[2];
  });

  return (
    <ul>
      {nearby.map(([id, portal, dist]) => {
        return (
          <li key={id}>
            <ExitListing portal={portal} dist={dist} />
          </li>
        );
      })}
    </ul>
  );
}
