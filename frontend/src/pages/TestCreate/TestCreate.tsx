import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useSteps } from "../../hooks";
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
        }).then(() => {
            navigate(`/${name}`);
        });
        event.preventDefault();
    }, [name, isLogin, steps, createTest, navigate]);

    useEffect(() => {
        setSteps([]);
    }, [navigate, setSteps]);

    return (
        <TestCreateContainer>
            <form onSubmit={(event) => { onSubmitCreate(event) }}>
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
                        <Button type="submit">Submit</Button>
                    </SubmitContainer>
                </TestCreateSplitter>
            </form>
        </TestCreateContainer>
    );
}