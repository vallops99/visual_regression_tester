import { ReactNode } from "react";
import { ColorType } from "../../utils";

import { ButtonStyled } from "./ButtonStyles";

export interface ButtonProps {
    children: ReactNode;
    
    type?: "button" | "submit" | "reset";
    variant?: "outlined" | "icon";
    colorType?: ColorType;
    onClick?: () => void;

    dataTestId?: string;
};

export function Button({ colorType = "default", type, variant, onClick, children, dataTestId }: ButtonProps) {
    return <ButtonStyled
        type={type}
        colorType={colorType}
        variant={variant}
        onClick={onClick}
        data-testid={dataTestId}
    >
        {children}
    </ButtonStyled>;
}