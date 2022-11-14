import { RiCloseLine } from "react-icons/ri";

import { Button, Input, Label, Select } from "..";
import { Actions, ACTIONS_INPUTS_MAP, Arg, ArgAsObject } from "../../utils";
import {
    StepInfo,
    StepValue,
    StepLabel,
    ArgsContainer,
    InputDescription,
    ArgInputContainer,
    CloseIconContainer,
} from "./StepComponentStyles";

interface Props {
    stepId: number;

    args: Arg[];
    action: Actions;
    actionIndex: number;

    onChangeArgs: (newArg: Arg, argType: string, argIndex: number, actionIndex: number) => void;
    onChangeAction: (event: React.ChangeEvent<HTMLSelectElement>, index?: number) => void;
    onClickCloseEdit: (index: number) => void;
}

export function StepInputFields({ stepId, args, action, actionIndex, onChangeArgs, onChangeAction, onClickCloseEdit }: Props) {
    const argsFields = ACTIONS_INPUTS_MAP[action].config.map((arg, argIndex) => {
        let startValue: Arg = "";
        if (args.length > argIndex) {
            startValue = args[argIndex];
        }

        switch(arg.type) {
            case 'text':
            case 'number':
            case 'stringlist':
                return (
                    <ArgInputContainer key={`${actionIndex}-${argIndex}`}>
                        <Label htmlFor={`${actionIndex}-${argIndex}`}>{arg.name}:</Label>
                        <InputDescription>{arg.descr}</InputDescription>
                        <Input
                            id={`${actionIndex}-${argIndex}`}
                            type={arg.type}
                            name={arg.name}
                            placeholder={`${arg.type}...`}
                            value={startValue as string | number}
                            onChange={(event) => onChangeArgs(event.target.value, arg.type, argIndex, actionIndex)}
                        />
                    </ArgInputContainer>
                );
            case 'object':
                return (
                    arg.values.map((value, subindex) => {
                        return (
                            <ArgInputContainer key={`${actionIndex}-${argIndex}-${subindex}`}>
                                <Label htmlFor={`${actionIndex}-${argIndex}-${subindex}`}>{value.name}:</Label>
                                <InputDescription>{value.descr}</InputDescription>
                                {
                                    value.type === "select" ?
                                        <Select
                                            id={`${actionIndex}-${argIndex}-${subindex}`}
                                            name={value.name}
                                            options={[...value.values]}
                                            selectedOption={(startValue as ArgAsObject)[value.name]}
                                            onChange={(event) => onChangeArgs({ [value.name]: event.target.value }, arg.type, argIndex, actionIndex)}
                                        />
                                    :
                                        <Input
                                            id={`${actionIndex}-${argIndex}-${subindex}`}
                                            type={value.type}
                                            name={value.name}
                                            placeholder={`${value.type}...`}
                                            value={(startValue as ArgAsObject)[value.name] as string | number}
                                            onChange={(event) => onChangeArgs({ [value.name]: event.target.value }, arg.type, argIndex, actionIndex)}
                                    />
                                }
                            </ArgInputContainer>
                        );
                    })
                );
            default:
                return <></>;
        }
    });

    return (
        <>
            <StepInfo>
                <StepLabel>ID:</StepLabel> <StepValue>{stepId}</StepValue>
            </StepInfo>
            <StepInfo>
                <StepLabel>Action:</StepLabel>
                <Select
                    name="stepAction"
                    options={Object.keys(ACTIONS_INPUTS_MAP)}
                    selectedOption={action}
                    onChange={(event) => onChangeAction(event, actionIndex)}

                />
            </StepInfo>

            <StepLabel>with values:</StepLabel>
            <ArgsContainer>
                {argsFields}
            </ArgsContainer>

            <CloseIconContainer>
                <Button
                    type="button"
                    variant="icon"
                    colorType="error"
                    onClick={() => onClickCloseEdit(actionIndex)}
                >
                    <RiCloseLine />
                </Button>
            </CloseIconContainer>
        </>
    );
}