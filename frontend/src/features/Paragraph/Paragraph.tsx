import { ReactNode } from "react";

import { ParagraphStyled } from "./ParagraphStyles";

interface Props {
    variant?: "success" | "error";
    children: ReactNode;
    className?: string
}

export function Paragraph({ variant, children, className }: Props) {
    return <ParagraphStyled variant={variant} className={className}>{children}</ParagraphStyled>;
}