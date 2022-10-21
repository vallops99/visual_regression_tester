import { ReactNode } from "react";
import { ColorType } from "../../utils";

import { ButtonStyled } from "./ButtonStyles";

export interface ButtonProps {
    children: ReactNode;
    
    variant?: String;
    colorType?: ColorType;
    onClick?: () => void;
};

export function Button({ colorType = "default", variant, onClick, children }: ButtonProps) {
    return <ButtonStyled colorType={colorType} variant={variant} onClick={onClick}>{children}</ButtonStyled>;
}