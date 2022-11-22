import { ReactNode } from "react";

import { ColorType } from "../../utils";
import { ParagraphStyled } from "./ParagraphStyles";

interface Props {
    variant?: ColorType;
    children: ReactNode;
    className?: string;

    dataTestId?: string;
}

export function Paragraph({ variant, children, className, dataTestId }: Props) {
    return <ParagraphStyled
        variant={variant}
        className={className}

        data-testid={dataTestId}
    >
        {children}
    </ParagraphStyled>;
}