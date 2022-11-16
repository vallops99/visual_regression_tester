import { createContext, ReactNode, useCallback, useMemo, useState } from "react";

import { Modal } from "../features";
import { ModalType } from "../utils";


type ModalContextType = {
    modal?: ReactNode,
    setModal: (modal: ModalType) => void
};

export const ModalContext = createContext<ModalContextType>({
    modal: undefined,
    setModal: () => {}
});

interface Props {
    children: ReactNode
}

export function ModalContextProvider({ children }: Props) {
    const [modal, setModal] = useState<ReactNode>();

    const setModalExtended = useCallback((modal?: ModalType) => {
        if (!modal) {
            setModal(undefined);
            return;
        }

        setModal(<Modal
            type={modal.type}
            title={modal.title}
            body={modal.body}
            setModal={setModalExtended}
        />);
    }, [setModal])

    const value = useMemo(() => ({ modal, setModal: setModalExtended }), [modal, setModalExtended]);

    return (
        <ModalContext.Provider value={value}>
            { children }
        </ModalContext.Provider>
    );
}