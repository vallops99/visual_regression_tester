import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useModal, useSteps } from "../../hooks";
import {
    Steps,
    Label,
    Input,
    Button,
    Divider,
    useCreateTestMutation,
} from "../../features";
import {
    InputContainer,
    InputsContainer,
    SubmitContainer,
    TestCreateSplitter,
    TestCreateContainer,
} from "./TestCreateStyles";

export function TestCreate() {
    const { steps, setSteps } = useSteps();
    const { modal, setModal } = useModal();

    const [name, setName] = useState("");
    const [isLogin, setIsLogin] = useState(false);

    const navigate = useNavigate();
    const [createTest] = useCreateTestMutation();

    const onChangeName = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => setName(event.target.value),
        [setName]
    );
    const onChangeIsLogin = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => setIsLogin(!!event.target.value),
        [setIsLogin]
    );

    const onSubmitCreate = useCallback((event: FormEvent<HTMLFormElement>) => {
        createTest({
            name,
            steps,
            isLogin,
        }).unwrap().then(() => {
            navigate(`/${name}`);
        }).catch(err => {
            setModal({
                type: "error",
                title: "Error during test creation",
                body: `The server has not been able to create the test, error is the following: ${JSON.stringify(err)}`,
            });
        });;
        event.preventDefault();
    }, [name, isLogin, steps, createTest, navigate, setModal]);

    useEffect(() => {
        setSteps([]);
    }, [navigate, setSteps]);

    return (
        <TestCreateContainer>
            {modal}
            <form onSubmit={(event) => { onSubmitCreate(event) }} data-testid="testCreateForm">
                <TestCreateSplitter>
                    <InputsContainer>
                        <InputContainer>
                            <Label htmlFor="testName">Name of test</Label>
                            <Input
                                id="testName"
                                name="testName"
                                type="text"
                                placeholder="Test name..."
                                value={name}
                                onChange={onChangeName}
                                required={true}
                                dataTestId="testCreateTextInput"
                            />
                        </InputContainer>
                        <InputContainer>
                            <Label htmlFor="isLogin">Is a login test?</Label>
                            <Input
                                id="isLogin"
                                name="isLogin"
                                type="checkbox"
                                value={isLogin ? 1 : 0}
                                onChange={onChangeIsLogin}
                            />
                        </InputContainer>
                        <Steps />
                    </InputsContainer>
                    <Divider />
                    <SubmitContainer>
                        <Button type="submit" dataTestId="testCreateSubmit">Submit</Button>
                    </SubmitContainer>
                </TestCreateSplitter>
            </form>
        </TestCreateContainer>
    );
}