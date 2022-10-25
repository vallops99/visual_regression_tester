import { LdsRing, LdsRingInner, SpinnerContainer } from './SpinnerStyles';

interface Props {
    variant?: "viewport" | "default";
}

export function Spinner({ variant = "default" }: Props) {
    return (
        <SpinnerContainer variant={variant}>
            <LdsRing>
                <LdsRingInner></LdsRingInner>
                <LdsRingInner></LdsRingInner>
                <LdsRingInner></LdsRingInner>
                <LdsRingInner></LdsRingInner>
            </LdsRing>
        </SpinnerContainer>
    );
}