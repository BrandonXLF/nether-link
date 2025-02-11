import { useAppDispatch, useAppSelector } from "@/store/hooks";
import BooleanButtons from "./BooleanButtons";
import { set } from "@/store/optionsSlice";

export default function ShowAllToggle() {
  const showAll = useAppSelector((state) => state.options.showAll);
  const dispatch = useAppDispatch();

  return (
    <BooleanButtons
      falseText="Show exits"
      trueText="Show all in range"
      value={showAll}
      onChange={(value) => dispatch(set({ key: "showAll", value }))}
    />
  );
}
