import { ReactNode } from "react";

import { LabelStyled } from "./LabelStyles";

interface Props {
    htmlFor?: string;
    children: ReactNode;
};

export function Label({ htmlFor, children }: Props) {
    return <LabelStyled htmlFor={htmlFor}>{children}</LabelStyled>;
}