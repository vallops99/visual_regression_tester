import { useCallback } from "react";
import { VscGrabber } from "react-icons/vsc";
import {
    Draggable,
    Droppable,
    DropResult,
    DragDropContext,
} from "react-beautiful-dnd";

import { useLastStepId, useModal, useSteps } from "../../hooks";
import { Button, StepComponent, useReorderStepsMutation } from "..";
import { ACTIONS_INPUTS_MAP, Step } from "../../utils";
import {
    StepsList,
    StepsTitle,
    StepWrapper,
    StepContainer,
    StepsContainer,
    DraggableWrapper,
    GrabIconContainer,
} from "./StepsStyles";

interface Props {
    testName?: string;
}

export function Steps({ testName }: Props) {
    const { steps, setSteps } = useSteps();
    const { setModal } = useModal();
    const { lastId, setLastId } = useLastStepId();

    const [reorderSteps] = useReorderStepsMutation();

    const onClickAddStep = useCallback(() => {
        setSteps([
            ...steps,
            {
                id: lastId + 1,
                isNew: true,
                action: "tap",
                order: steps.length,
                args: [...ACTIONS_INPUTS_MAP["tap"].default],
            }
        ]);

        setLastId(lastId + 1);
    }, [steps, lastId, setLastId, setSteps]);

    const onClickCloseEdit = useCallback((index: number) => {
        const stepsCopy = [...steps];
        stepsCopy.splice(index, 1);

        setSteps(stepsCopy.map((step, index) => ({ ...step, order: index })));
    }, [steps, setSteps]);

    const onDragEnd = useCallback((result: DropResult) => {
        if (!result.destination) return;

        // Split legit steps (synched with the db) from the new steps (that still need to be synched)
        const { reorderedSteps, newSteps } = [...steps].reduce<{ reorderedSteps: Step[], newSteps: Step[]}>(
            (memo, step) => {
                memo[step.isNew ? 'newSteps' : 'reorderedSteps'].push(step);
                return memo;
            }, {
                reorderedSteps: [],
                newSteps: []
            }
        );

        // Don't apply edits if the destinations is through the new steps
        // Returning now will revert the drag and drop changes, because 
        // we didn't edit the steps state
        if (result.destination.index >= reorderedSteps.length) return;

        const deletedSteps = reorderedSteps.splice(result.source.index, 1);
        reorderedSteps.splice(result.destination.index, 0, deletedSteps[0]);

        // If we have a legit test (a test synched with the db) we can sync the
        // reorder on the db
        if (testName) {
            reorderSteps(reorderedSteps.map(
                (step, index) => ({ ...step, order: index })
            )).unwrap().catch(err => {
                setModal({
                    type: "error",
                    title: "Error during steps reorder",
                    body: `The server has not been able to reorder the steps, error is the following: ${JSON.stringify(err)}`,
                });
            });
        }

        setSteps([...reorderedSteps, ...newSteps]);
    }, [steps, testName, setSteps, reorderSteps, setModal]);

    const updateLocalSteps = useCallback((index: number, step: Step) => {
        const stepsCopy = [...steps];
        stepsCopy.splice(index, 1, step);

        setSteps(stepsCopy);
    }, [steps, setSteps]);

    return (
        <StepsContainer>
            <StepsTitle>
                Steps
            </StepsTitle>
            <StepsList>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="droppable-1">
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                {steps.map((step, index) => (
                                    <Draggable
                                        draggableId={`draggable-${step.id}`}
                                        index={index}
                                        key={`step-${step.id}`}
                                        isDragDisabled={step.isNew}
                                    >
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                style={provided.draggableProps.style}
                                            >
                                                <DraggableWrapper>
                                                    <StepContainer>
                                                        <StepWrapper>
                                                            <StepComponent
                                                                step={step}
                                                                index={index}

                                                                testName={testName}
                                                                onClickCloseEdit={onClickCloseEdit}
                                                                updateLocalSteps={updateLocalSteps}
                                                            />
                                                            {!step.isNew && (
                                                                <GrabIconContainer {...provided.dragHandleProps}>
                                                                    <VscGrabber />
                                                                </GrabIconContainer>
                                                            )}
                                                        </StepWrapper>
                                                    </StepContainer>
                                                </DraggableWrapper>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </StepsList>
            <Button type="button" onClick={onClickAddStep}>
                Add Step
            </Button>
        </StepsContainer>
    );
}