import { ReactNode } from "react";

import { ColorType } from "../../utils";
import { ParagraphStyled } from "./ParagraphStyles";

interface Props {
    variant?: ColorType;
    children: ReactNode;
    className?: string
}

export function Paragraph({ variant, children, className }: Props) {
    return <ParagraphStyled variant={variant} className={className}>{children}</ParagraphStyled>;
}