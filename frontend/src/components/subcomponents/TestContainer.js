import { Box, Container } from "@mui/material";

export default class TestContainer {
    
    constructor() {

    }

    render() {
        const cards = ['test1', 'test2', 'test3'];

        return (
            <Container>
                <Box
                    sx={{
                        display: 'flex',
                        flex-wrap: 'wrap',
                        width: '80%',
                    }}>
                    {cards.map((card) => {
                        <Box>
                            {card}
                        </Box>
                    })}
                </Box>
                <Divider orientation='vertical' />
                <TestFeatures />
            </Container>
        );
    }
}