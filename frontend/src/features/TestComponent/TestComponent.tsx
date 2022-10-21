import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { Test } from "../../utils";
import { Button, Spinner, Divider } from "..";
import {
    TestBox,
    TestImage,
    TestActions,
    ParagraphNoDiff,
    TestImageContainer,
    TestButtonConfirmations,
} from "./TestComponentStyles";

interface Props {
    test: Test;
    testsLaunched: boolean;
    onClickSetTests: (tests : Test[], accept: boolean) => void;
}

export function TestComponent({ test, testsLaunched, onClickSetTests } : Props) {
    const navigate = useNavigate();

    const onClickShow = useCallback(() => {
        navigate(`/${test.name}`);
    }, [navigate, test.name]);

    return (
        <TestBox>

            {(testsLaunched || test.pending) && <Spinner />}

            <div>
                <h3>{test.name}</h3>
                <TestImageContainer>
                    <TestImage
                        src={!test.hasDiff ? test.imagePath : test.diffPath}
                        alt={test.name}
                    />
                </TestImageContainer>
            </div>
            <Divider orientation="horizontal" />
            <TestActions>
                {!test.hasDiff ?
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