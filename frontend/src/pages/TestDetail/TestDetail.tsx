import { useCallback } from "react";
import { useParams } from "react-router-dom";

import {
    ImgButton,
    useSetTestsMutation,
    useGetTestByNameQuery,
    Spinner,
} from "../../features";
import {
    ImgStyled,
    ImageDetail,
    TestWrapperDiv,
    ErrorTestDetail,
    TestDetailHeader,
    ErrorTestDetailContainer,
} from './TestDetailStyles';

export function TestDetail() {
    let params = useParams();

    const { data: test, isFetching } = useGetTestByNameQuery(params.testName || '');
    const [setTests] = useSetTestsMutation();

    const onClickSetTests = useCallback((accept : boolean) => {
        setTests({
            tests: [test!],
            accept
        });
    }, [setTests, test]);

    if (!test) {
        return (
            <ErrorTestDetailContainer>
                <ErrorTestDetail>Something wrong happened, can't load the test requested</ErrorTestDetail>
            </ErrorTestDetailContainer>
        );
    }

    return (
        <TestWrapperDiv>

            {isFetching && <Spinner/>}

            <TestDetailHeader>{test.name}</TestDetailHeader>

            {!test.hasDiff && (
                <ImageDetail>
                    <p>Saved image</p>
                    <ImgStyled src={test.imagePath}></ImgStyled>
                </ImageDetail>
            )}

            {test.hasDiff && (
                <>
                    <ImageDetail>
                        <p>New image</p>
                        <ImgButton
                            colorType="success"
                            src={test.lastImagePath}
                            onClick={() => onClickSetTests(true)}
                        >
                                Accept changes
                        </ImgButton>
                    </ImageDetail>
                    <ImageDetail>
                        <p>Starting image</p>
                        <ImgButton
                            colorType="error"
                            src={test.imagePath}
                            onClick={() => onClickSetTests(false)}
                        >
                            Reject changes
                        </ImgButton>
                    </ImageDetail>
                    <ImageDetail>
                        <p>Difference between the two</p>
                        <ImgStyled src={test.diffPath}></ImgStyled>
                    </ImageDetail>
                </>
            )}

        </TestWrapperDiv>
    );
}