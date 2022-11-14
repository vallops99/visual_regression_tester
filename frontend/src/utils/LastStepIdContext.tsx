import { createContext, ReactNode, useEffect, useMemo, useState } from "react";

import { useGetLastStepIdQuery } from "../features";

type LastStepIdContextType = {
    lastId: number,
    setLastId: (id: number) => void
};

export const LastStepIdContext = createContext<LastStepIdContextType>({
    lastId: 0,
    setLastId: () => {}
});

interface Props {
    children: ReactNode
}

export function LastStepIdContextProvider({ children }: Props) {
    const [lastId, setLastId] = useState<number>(0);
    
    const { data: lastStepId } = useGetLastStepIdQuery();

    useEffect(() => {
        setLastId(lastStepId || 0);
    }, [lastStepId])

    const value = useMemo(() => ({ lastId, setLastId }), [lastId, setLastId]);

    return (
        <LastStepIdContext.Provider value={value}>
            { children }
        </LastStepIdContext.Provider>
    );
}