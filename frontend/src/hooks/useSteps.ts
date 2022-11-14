import { useContext } from "react";
import { StepsContext } from "../utils/StepsContext";

export function useSteps() {
    return useContext(StepsContext);
}