import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsPlusLg } from "react-icons/bs";

import { Test } from "../../utils";
import { useModal } from "../../hooks";
import {
    Button,
    Spinner,
    Divider,
    TestComponent,
    useGetTestsQuery,
    useSetTestsMutation,
    useLaunchTestsMutation,
    useGetNotificationsMutation,
} from "../../features";
import {
    Cross,
    Tests,
    CreateTest,
    UtilsContainer,
    TestsContainer,
    ErrorTestsMain,
    DividerContainer,
    TestsMainContainer,
    CreateTestContainer,
    ErrorTestsMainContainer,
} from './TestsMainStyles';

export function TestsMain() {
    const { modal, setModal } = useModal();

    const [waitForNotification, setWaitForNotification] = useState(false);
    
    const { data: testsObject = { tests: [], areInvalid: true }, isFetching, isError } = useGetTestsQuery();

    const [setTests] = useSetTestsMutation();
    const [launchTests] = useLaunchTestsMutation();
    const [getNotifications] = useGetNotificationsMutation();

    const navigate = useNavigate();

    const checkNotifications = useCallback((intervalId: NodeJS.Timer) => {
        getNotifications().unwrap().then(response => {
            if (response.testsToReload.length) setWaitForNotification(false);

            if (response.areTestsDone) clearInterval(intervalId);
        }).catch(err => {
            setModal({
                type: "error",
                title: "Error during notification check",
                body: `The server has not been able to provide notification info, error is the following: ${JSON.stringify(err)}`,
            });
        });
    }, [getNotifications, setModal]);

    const onClickLaunchTests = useCallback(() => {
        setWaitForNotification(true);

        launchTests().unwrap().then(() => {
            const intervalFunction = () : void => checkNotifications(intervalId);
            const intervalId = setInterval(intervalFunction, 1000);
        }).catch(err => {
            setModal({
                type: "error",
                title: "Error during test launch",
                body: `The server has not been able to launch the tests, error is the following: ${JSON.stringify(err)}`,
            });
        });
    }, [checkNotifications, launchTests, setWaitForNotification, setModal]);

    const onClickSetTests = useCallback((tests: Test[], accept : boolean) => {
        setTests({
            tests,
            accept
        }).unwrap().catch(err => {
            setModal({
                type: "error",
                title: "Error during test update",
                body: `The server has not been able to update the test(s), error is the following: ${JSON.stringify(err)}`,
            });
        });
    }, [setTests, setModal]);

    const onClickCreateTest = useCallback(() => navigate('/create'), [navigate]);

    return (
        <TestsMainContainer>
            {modal}
            <Tests>
                {isFetching && <Spinner variant="viewport" />}
                <TestsContainer>
                    {isError ?
                        <ErrorTestsMainContainer>
                            <ErrorTestsMain data-testid="errorTestsMain">Something wrong happened, can not load the tests</ErrorTestsMain>
                        </ErrorTestsMainContainer>
                    :
                        testsObject.tests.map(test => (
                            <TestComponent
                                test={test}
                                key={test.name}
                                onClickSetTests={onClickSetTests}
                                waitForNotification={waitForNotification}
                            />
                        ))
                    }
                </TestsContainer>
                <Divider />
                <UtilsContainer>
                    <Button
                        onClick={onClickLaunchTests}
                        dataTestId="launchTests"
                    >
                        Launch tests
                    </Button>
                    {testsObject.areInvalid && 
                        <>
                            <DividerContainer>
                                <Divider orientation="horizontal" />
                            </DividerContainer>
                            <Button
                                colorType="success"
                                onClick={() => onClickSetTests(testsObject.tests, true)}
                                dataTestId="acceptAllChanges"
                            >
                                Accept all
                            </Button>
                            <Button
                                colorType="error"
                                onClick={() => onClickSetTests(testsObject.tests, false)}
                                dataTestId="refuseAllChanges"
                            >
                                Reject All
                            </Button>
                        </>
                    }
                </UtilsContainer>
            </Tests>
            <CreateTestContainer>
                <CreateTest onClick={onClickCreateTest}>
                    <Cross><BsPlusLg /></Cross>
                </CreateTest>
            </CreateTestContainer>
        </TestsMainContainer>
    );
}
