import { RiCloseLine } from "react-icons/ri";
import { useCallback } from "react";

import { Button } from "..";
import { ColorType, ModalType } from "../../utils";
import {
    ModalBody,
    ModalTitle,
    ModalContainer,
    ModalCloseButton,
    ModalInnerContainer,
} from "./ModalStyles";


interface Props {
    type: ColorType;
    title: string;
    body?: string;
    setModal: (modal?: ModalType) => void
};

export function Modal({ type, title, body, setModal }: Props) {
    const onClickCloseModal = useCallback(() => {
        setModal(undefined);
    }, [setModal]);

    return (
        <ModalContainer type={type}  data-testid="modalError">
            <ModalInnerContainer>
                <ModalTitle>{title}</ModalTitle>
                <ModalBody>{body}</ModalBody>
                <ModalCloseButton>
                    <Button
                        type="button"
                        variant="icon"
                        colorType="error"
                        onClick={() => onClickCloseModal()}
                    >
                        <RiCloseLine />
                    </Button>
                </ModalCloseButton>
            </ModalInnerContainer>
        </ModalContainer>
    );
}