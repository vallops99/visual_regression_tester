import { useContext } from "react";
import { LastStepIdContext } from "../utils/LastStepIdContext";

export function useLastStepId() {
    return useContext(LastStepIdContext);
}