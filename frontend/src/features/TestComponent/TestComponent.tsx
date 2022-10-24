import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { Test } from "../../utils";
import { Button, Spinner, Divider } from "..";
import {
    TestBox,
    TestTitle,
    TestImage,
    TestActions,
    ParagraphNoDiff,
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

            <div>
                <TestTitle>{test?.name}</TestTitle>
                <TestImageContainer>
                    <TestImage
                        src={!test?.hasDiff ? test?.imagePath : test.diffPath}
                        alt={test?.name}
                    />
                </TestImageContainer>
            </div>
            <Divider orientation="horizontal" />
            <TestActions>
                {!test?.hasDiff ?
                    <ParagraphNoDiff>Test has found no differences</ParagraphNoDiff> :
                    <>
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