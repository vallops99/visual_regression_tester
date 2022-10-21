import { LdsRing, LdsRingInner, SpinnerContainer } from './SpinnerStyles';

export function Spinner() {
    return (
        <SpinnerContainer >
            <LdsRing>
                <LdsRingInner></LdsRingInner>
                <LdsRingInner></LdsRingInner>
                <LdsRingInner></LdsRingInner>
                <LdsRingInner></LdsRingInner>
            </LdsRing>
        </SpinnerContainer>
    );
}