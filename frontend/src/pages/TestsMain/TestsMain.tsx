import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsPlusLg } from "react-icons/bs";

import { Test } from "../../utils";
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
    ErrorTestDetail,
    DividerContainer,
    TestsMainContainer,
    CreateTestContainer,
    ErrorTestDetailContainer,
} from './TestsMainStyles';

export function TestsMain() {
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
        });
    }, [getNotifications]);

    const onClickLaunchTests = useCallback(() => {
        setWaitForNotification(true);

        launchTests().then(() => {
            const intervalFunction = () : void => checkNotifications(intervalId);
            const intervalId = setInterval(intervalFunction, 1000);
        });
    }, [checkNotifications, launchTests, setWaitForNotification]);

    const onClickSetTests = useCallback((tests: Test[], accept : boolean) => {
        setTests({
            tests,
            accept
        });
    }, [setTests]);

    const onClickCreateTest = useCallback(() => navigate('/create'), [navigate]);

    return (
        <TestsMainContainer>
            <Tests>
                {isFetching && <Spinner variant="viewport" />}
                <TestsContainer>
                    {isError ?
                        <ErrorTestDetailContainer>
                            <ErrorTestDetail>Something wrong happened, can not load the tests</ErrorTestDetail>
                        </ErrorTestDetailContainer>
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
                    <Button onClick={onClickLaunchTests}>Launch tests</Button>
                    {testsObject.areInvalid && 
                        <>
                            <DividerContainer>
                                <Divider orientation="horizontal" />
                            </DividerContainer>
                            <Button colorType="success" onClick={() => onClickSetTests(testsObject.tests, true)}>Accept all</Button>
                            <Button colorType="error" onClick={() => onClickSetTests(testsObject.tests, false)}>Reject All</Button>
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
