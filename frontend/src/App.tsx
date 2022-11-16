import { BrowserRouter } from "react-router-dom";

import { Navbar } from "./features";
import { ErrorBoundary } from "./pages";
import { ThemeWrapper } from "./AppStyles";
import {
    StepsContextProvider,
    ThemeContextProvider,
    ModalContextProvider,
    LastStepIdContextProvider,
} from "./utils";

import "./App.css";

function App() {
    return (
        <ErrorBoundary>
            <ThemeContextProvider>
                <StepsContextProvider>
                    <LastStepIdContextProvider>
                        <ModalContextProvider>
                            <ThemeWrapper>
                                <BrowserRouter>
                                    <Navbar />
                                </BrowserRouter>
                            </ThemeWrapper>
                        </ModalContextProvider>
                    </LastStepIdContextProvider>
                </StepsContextProvider>
            </ThemeContextProvider>
        </ErrorBoundary>
    );
}

export default App;
