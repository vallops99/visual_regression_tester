import { useCallback, useState } from "react";

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
import { Test } from "../../utils";
import {
    Tests,
    TestsContainer,
    UtilsContainer,
} from './TestsMainStyles';

export function TestsMain() {
    const { data: testsObject = { tests: [], areInvalid: true }, isFetching } = useGetTestsQuery();

    const [waitForNotification, setWaitForNotification] = useState(false);

    const [setTests] = useSetTestsMutation();
    const [launchTests] = useLaunchTestsMutation();
    const [getNotifications] = useGetNotificationsMutation();

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

    return (
        <Tests>
            {isFetching && <Spinner />}
            <TestsContainer>
                {testsObject.tests.map(test => (
                    <TestComponent
                        test={test}
                        key={test.name}
                        onClickSetTests={onClickSetTests}
                        waitForNotification={waitForNotification}
                    />
                ))}
            </TestsContainer>
            <Divider />
            <UtilsContainer>
                <Button onClick={onClickLaunchTests}>Launch tests</Button>
                {testsObject.areInvalid && 
                    <>
                        <Button colorType="success" onClick={() => onClickSetTests(testsObject.tests, true)}>Accept all</Button>
                        <Button colorType="error" onClick={() => onClickSetTests(testsObject.tests, false)}>Reject All</Button>
                    </>
                }
            </UtilsContainer>
        </Tests>
    );
}
