import { FiTrash2 } from "react-icons/fi";
import { useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useModal, useSteps } from "../../hooks";
import {
    Steps,
    Button,
    Divider,
    Spinner,
    ImgButton,
    useGetTestQuery,
    useSetTestsMutation,
    useDeleteTestMutation,
} from "../../features";
import {
    ImgStyled,
    ImageDetail,
    TestWrapper,
    TestSplitter,
    ErrorTestDetail,
    TestDetailHeader,
    DeleteTestContainer,
    TestDetailContainer,
    ImageDetailDescription,
    ErrorTestDetailContainer,
} from './TestDetailStyles';

export function TestDetail() {
    const params = useParams();
    const navigate = useNavigate();
    const { setSteps } = useSteps();
    const { modal, setModal } = useModal();

    const { data: test, isFetching, isError } = useGetTestQuery(params.testName || '');

    const [setTests] = useSetTestsMutation();
    const [deleteTest] = useDeleteTestMutation();

    const onClickDeleteTest = useCallback(() => {
        deleteTest({ name: test?.name || "" }).unwrap().then(() => {
            navigate("/");
        }).catch(err => {
            setModal({
                type: "error",
                title: "Error during notification check",
                body: `The server has not been able to provide notification info, error is the following: ${JSON.stringify(err)}`,
            });
        });
    }, [test?.name, deleteTest, navigate, setModal]);

    const onClickSetTests = useCallback((accept : boolean) => {
        setTests({ tests: [test!], accept }).unwrap().catch(err => {
            setModal({
                type: "error",
                title: "Error during test update",
                body: `The server has not been able to udpate the test, error is the following: ${JSON.stringify(err)}`,
            });
        });
    }, [test, setTests, setModal]);

    useEffect(() => {
        setSteps(test?.steps || []);
    }, [test, setSteps]);

    if (isFetching) {
        return (
            <TestDetailContainer>
                <TestSplitter>
                    <Spinner/>
                </TestSplitter>
            </TestDetailContainer>
        );
    }

    if (isError || !test) {
        return (
            <ErrorTestDetailContainer>
                <ErrorTestDetail data-testid="errorTestDetail">Something wrong happened, can't load the test requested</ErrorTestDetail>
            </ErrorTestDetailContainer>
        );
    }

    return (
        <TestDetailContainer>
            {modal}
            <TestSplitter>
                <TestWrapper>
                    <DeleteTestContainer>
                        <Button
                            type="button"
                            variant="icon"
                            colorType="error"
                            onClick={() => onClickDeleteTest()}
                        >
                            <FiTrash2 />
                        </Button>
                    </DeleteTestContainer>
                    <TestDetailHeader>
                        {test.name}
                    </TestDetailHeader>

                    {test.error ?
                        <ErrorTestDetailContainer>
                            <ErrorTestDetail>{test.error}</ErrorTestDetail>
                        </ErrorTestDetailContainer>
                    :
                    <>
                        {!test.done && (
                            <ErrorTestDetailContainer>
                                <ErrorTestDetail>
                                    Test has not ran yet.
                                </ErrorTestDetail>
                            </ErrorTestDetailContainer>
                        )}

                        {!test.hasDiff && test.done && (
                            <ImageDetail>
                                <ImageDetailDescription>
                                    Saved image
                                </ImageDetailDescription>
                                <ImgStyled src={test.imagePath}></ImgStyled>
                            </ImageDetail>
                        )}

                        {test.hasDiff && (
                            <>
                                <ImageDetail>
                                    <ImageDetailDescription>
                                        New image
                                    </ImageDetailDescription>
                                    <ImgButton
                                        colorType="success"
                                        variant="outlined"
                                        src={test.lastImagePath}
                                        alt={`${test.name} new image`}
                                        onClick={() => onClickSetTests(true)}
                                    >
                                            Accept NEW image
                                    </ImgButton>
                                </ImageDetail>
                                <ImageDetail>
                                    <ImageDetailDescription>
                                        Starting image
                                    </ImageDetailDescription>
                                    <ImgButton
                                        colorType="error"
                                        variant="outlined"
                                        src={test.imagePath}
                                        alt={`${test.name} starting image`}
                                        onClick={() => onClickSetTests(false)}
                                    >
                                        Accept OLD image
                                    </ImgButton>
                                </ImageDetail>
                                <ImageDetail>
                                    <ImageDetailDescription>
                                        Difference between the two
                                    </ImageDetailDescription>
                                    <ImgStyled src={test.diffPath} alt={`${test.name} difference image`}/>
                                </ImageDetail>
                            </>
                        )}
                    </>
                }
                </TestWrapper>
                <Divider />
                <Steps testName={test.name}/>
            </TestSplitter>
        </TestDetailContainer>
    );
}