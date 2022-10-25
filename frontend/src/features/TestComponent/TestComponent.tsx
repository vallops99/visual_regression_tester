import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { Test } from "../../utils";
import { Button, Spinner, Divider, Paragraph } from "..";
import {
    TestBox,
    TestTitle,
    TestImage,
    TestActions,
    TestBodyContainer,
    TestImageContainer,
    TestButtonConfirmations,
} from "./TestComponentStyles";

interface Props {
    test: Test;
    waitForNotification: boolean;
    onClickSetTests: (tests : Test[], accept: boolean) => void;
}

export function TestComponent({ test, onClickSetTests, waitForNotification } : Props) {
    const navigate = useNavigate();

    const onClickShow = useCallback(() => {
        navigate(`/${test?.name}`);
    }, [navigate, test?.name]);

    return (
        <TestBox>

            {(waitForNotification || test.pending) && <Spinner />}

            <TestBodyContainer>
                <TestTitle>{test?.name}</TestTitle>
                <TestImageContainer>
                    <TestImage
                        src={test?.hasDiff ? test.diffPath : test?.imagePath}
                        alt={`${test?.name} difference image`}
                    />
                </TestImageContainer>
            </TestBodyContainer>
            <Divider orientation="horizontal" />
            <TestActions>
                {test.error ? <Paragraph variant="error">{test.error}</Paragraph> :
                    <>
                        {!test?.hasDiff && <Paragraph>Test has found no differences</Paragraph>}
                        {test?.hasDiff && <>
                            <TestButtonConfirmations>
                                <Button
                                    colorType="success"
                                    variant="outlined"
                                    onClick={() => onClickSetTests([test], true)}
                                >
                                    Accept changes
                                </Button>
                                <Button
                                    colorType="error"
                                    variant="outlined"
                                    onClick={() => onClickSetTests([test], false)}
                                >
                                    Reject changes
                                </Button>
                            </TestButtonConfirmations>
                        </>}
                    </>
                }
                <Button
                    onClick={onClickShow}
                >
                    Show in depth
                </Button>
            </TestActions>
        </TestBox>
    );
}