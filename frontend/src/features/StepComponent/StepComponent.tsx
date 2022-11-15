import { MdEdit } from "react-icons/md";
import { FiTrash2 } from "react-icons/fi";
import { useCallback, useState } from "react";

import { useLastStepId } from "../../hooks";
import { StepInputFields } from "./StepInputFields";
import { Actions, Arg, Step, ACTIONS_INPUTS_MAP } from "../../utils";
import {
    Button,
    useDeleteStepMutation,
    useUpdateOrCreateStepMutation
} from "..";
import {
    StepInfo,
    StepLabel,
    StepValue,
    StepComponentForm,
    EditIconContainer,
    DeleteIconContainer,
} from "./StepComponentStyles";

interface Props {
    step: Step;
    index: number;
    onClickCloseEdit: (index: number) => void;
    updateLocalSteps: (index: number, step: Step) => void;

    testName?: string;
}

export function StepComponent({ step, index, testName, onClickCloseEdit, updateLocalSteps }: Props) {
    const { lastId, setLastId } = useLastStepId();

    const [isEditing, setIsEditing] = useState(step.isNew);
    const [argsState, setArgsState] = useState<Arg[]>(step.args);
    const [actionState, setActionState] = useState<Actions>(step.action);

    const [deleteStep] = useDeleteStepMutation();
    const [updateOrCreateStep] = useUpdateOrCreateStepMutation();

    const onClickEdit = useCallback(() => setIsEditing(true), []);
    const onClickCloseEditExtended = useCallback(() => {
        setIsEditing(false);

        setActionState(step.action);
        setArgsState(step.args);

        if (step.isNew) {
            setLastId(lastId - 1);
            onClickCloseEdit(index);
        }
    }, [index, step, lastId, setLastId, onClickCloseEdit]);

    const onClickDeleteStep = useCallback(() => deleteStep({ id: step.id}), [step.id, deleteStep]);

    const onChangeAction = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
        const action = event.target.value as Actions;
        const args = [...ACTIONS_INPUTS_MAP[action].default];

        setArgsState(args);
        setActionState(action);

        updateLocalSteps(
            index,
            {
                ...step,

                action,
                args,
            }
        );
    }, [index, step, updateLocalSteps]);

    const onChangeArgs = useCallback((newArg: Arg, argType: string, argIndex: number, actionIndex: number) => {
        const argsCopy = [...argsState];

        if (argType === "object") {
            const objCopy = { ...argsCopy[argIndex] as object, ...newArg as object };
            argsCopy.splice(argIndex, 1, objCopy);
        } else if(argType === "stringlist") {
            argsCopy.push(newArg);
        } else {
            argsCopy[argIndex] = newArg;
        }

        setArgsState(argsCopy);

        if (step.isNew) {
            updateLocalSteps(
                actionIndex,
                {
                    ...step,

                    isNew: true,
                    action: actionState,
                    args: argsCopy
                }          
            );
        }
    }, [argsState, actionState, step, updateLocalSteps]);

    const onSubmitForm = useCallback((event: React.FormEvent<HTMLFormElement>) => {
        if (testName) {
            updateOrCreateStep({
                ...step,

                testId: testName,
                isNew: true,
                args: argsState,
                action: actionState
            });
        }

        setIsEditing(false);
        updateLocalSteps(
            index,
            {
                ...step,

                isNew: false,
                action: actionState,
                args: argsState
            }
        )

        event.preventDefault();
    }, [actionState, argsState, step, testName, index, updateLocalSteps, updateOrCreateStep]);

    let inputs = <StepInputFields
        stepId={step.id}
        args={argsState}
        actionIndex={index}
        action={actionState}
        onChangeArgs={onChangeArgs}
        onChangeAction={onChangeAction}
        onClickCloseEdit={onClickCloseEditExtended}
    />;

    if (testName) {
        inputs = (
            <StepComponentForm onSubmit={(event) => onSubmitForm(event)}>
                {inputs}
                <Button type="submit">Submit</Button>
            </StepComponentForm>
        );
    }

    if (isEditing || step.isNew) {
        return inputs;
    }

    return (
        <>
            <StepInfo>
                <StepLabel>ID:</StepLabel> <StepValue>{step.id}</StepValue>
            </StepInfo>
            <StepInfo>
                <StepLabel>Action:</StepLabel> <StepValue>{actionState}</StepValue>
            </StepInfo>
            {!!argsState.length && (
                <StepInfo>
                    <StepLabel>with values:</StepLabel> <StepValue>{JSON.stringify(argsState)}</StepValue>
                </StepInfo>
            )}
            <EditIconContainer>
                <Button type="button" variant="icon" onClick={onClickEdit}><MdEdit /></Button>
            </EditIconContainer>
            <DeleteIconContainer>
                <Button type="button" variant="icon" colorType="error" onClick={() => onClickDeleteStep()}><FiTrash2 /></Button>
            </DeleteIconContainer>
        </>
    );
}