import { createContext, ReactNode, useMemo, useState } from "react";

import { Step } from "./Types";

type stepsContextType = {
    steps: Step[],
    setSteps: (steps: Step[]) => void
};

export const StepsContext = createContext<stepsContextType>({
    steps: [],
    setSteps: (steps: Step[]) => {}
});

interface Props {
    children: ReactNode
}

export function StepsContextProvider({ children }: Props) {
    const [steps, setSteps] = useState<Step[]>([]);

    const value = useMemo(() => ({ steps, setSteps }), [steps, setSteps]);

    return (
        <StepsContext.Provider value={value}>
            { children }
        </StepsContext.Provider>
    );
}