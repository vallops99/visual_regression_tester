import { useCallback, useState } from "react";

import {
    Spinner,
    Divider,
    TestComponent,
    useGetTestQuery,
    useSetTestsMutation,
    useLaunchTestsMutation,
    useGetNotificationsMutation,
    Button
} from "../../features";
import { Test } from "../../utils";
import {
    Tests,
    TestsContainer,
    UtilsContainer,
} from './TestsMainStyles';

export function TestsMain() {
    const { data: testsObject = { tests: [], areInvalid: true }, isFetching } = useGetTestQuery();

    const [testsLaunched, setTestsLaunched] = useState(false);

    const [setTests] = useSetTestsMutation();
    const [launchTests] = useLaunchTestsMutation();
    const [getNotifications] = useGetNotificationsMutation();

    const checkNotifications = useCallback((intervalId: NodeJS.Timer) => {
        getNotifications().unwrap().then(response => {
            if (response.areTestsDone) {
                setTestsLaunched(false);
                clearInterval(intervalId);
            }
        });
    }, [getNotifications]);

    const onClickLaunchTests = useCallback(() => {
        setTestsLaunched(true);

        launchTests().then(() => {
            const intervalFunction = () : void => checkNotifications(intervalId);
            const intervalId = setInterval(intervalFunction, 1000);
        });
    }, [checkNotifications, launchTests, setTestsLaunched]);

    const onClickSetTests = useCallback((tests: Test[], accept : boolean) => {
        setTests({
            tests,
            accept
        });
    }, [setTests]);

    return (
        <Tests>
            {isFetching && <Spinner/>}
            <TestsContainer>
                {testsObject.tests.map((test: Test) => {
                    return (
                        <TestComponent
                            test={test}
                            key={test.name}
                            onClickSetTests={onClickSetTests}
                            testsLaunched={testsLaunched}
                        />
                )
                })}
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
