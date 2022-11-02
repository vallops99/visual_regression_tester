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

    const { data: test, isFetching, isError } = useGetTestQuery(params.testName || '');
    const [setTests] = useSetTestsMutation();

    const onClickSetTests = useCallback((accept : boolean) => {
        setTests({
            tests: [test!],
            accept
        });
    }, [setTests, test]);

    if (isError) {
        return (
            <ErrorTestDetailContainer>
                <ErrorTestDetail>Something wrong happened, can't load the test requested</ErrorTestDetail>
            </ErrorTestDetailContainer>
        );
    }

    return (
        <TestWrapperDiv>

            {isFetching && <Spinner/>}

            <TestDetailHeader>{test?.name}</TestDetailHeader>

            {!test?.hasDiff && (
                <ImageDetail>
                    <ImageDetailDescription>
                        Saved image
                    </ImageDetailDescription>
                    <ImgStyled src={test?.imagePath}></ImgStyled>
                </ImageDetail>
            )}

            {test?.hasDiff && (
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

        </TestWrapperDiv>
    );
}