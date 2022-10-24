import { Button, ButtonProps } from "..";
import { ImgProps } from "../Img/Img";
import {
    ImgStyled,
    ButtonContainer,
    ImgButtonContainer,
} from "./ImgButtonStyles";

export function ImgButton({ className, colorType, variant, src, alt, onClick, children}: ButtonProps & ImgProps) {
    return (
        <ImgButtonContainer className={className} color={colorType}>
            <ImgStyled src={src} alt={alt} />
            <ButtonContainer>
                <Button colorType={colorType} variant={variant} onClick={onClick}>{children}</Button>
            </ButtonContainer>
        </ImgButtonContainer>
    );
}