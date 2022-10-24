import { useCallback } from "react";
import { useParams } from "react-router-dom";

import {
    Spinner,
    ImgButton,
    useGetTestQuery,
    useSetTestsMutation,
} from "../../features";
import {
    ImgStyled,
    ImageDetail,
    TestWrapperDiv,
    ErrorTestDetail,
    TestDetailHeader,
    ImageDetailDescription,
    ErrorTestDetailContainer,
} from './TestDetailStyles';

export function TestDetail() {
    let params = useParams();

    const { data: test, isFetching } = useGetTestQuery(params.testName || '');
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
                            onClick={() => onClickSetTests(true)}
                        >
                                Accept changes
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
                            onClick={() => onClickSetTests(false)}
                        >
                            Reject changes
                        </ImgButton>
                    </ImageDetail>
                    <ImageDetail>
                        <ImageDetailDescription>
                            Difference between the two
                        </ImageDetailDescription>
                        <ImgStyled src={test.diffPath} />
                    </ImageDetail>
                </>
            )}

        </TestWrapperDiv>
    );
}