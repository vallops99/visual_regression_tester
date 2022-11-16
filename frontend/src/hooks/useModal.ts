import { useContext } from "react";
import { ModalContext } from "../utils/ModalContext";

export function useModal() {
    return useContext(ModalContext);
}