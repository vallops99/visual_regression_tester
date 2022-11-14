import { BrowserRouter } from "react-router-dom";

import { Navbar } from "./features";
import { ErrorBoundary } from "./pages";
import { ThemeWrapper } from "./AppStyles";
import {
    StepsContextProvider,
    ThemeContextProvider,
    LastStepIdContextProvider,
} from "./utils";

import "./App.css";

function App() {
    return (
        <ErrorBoundary>
            <ThemeContextProvider>
                <StepsContextProvider>
                    <LastStepIdContextProvider>
                        <ThemeWrapper>
                            <BrowserRouter>
                                <Navbar />
                            </BrowserRouter>
                        </ThemeWrapper>
                    </LastStepIdContextProvider>
                </StepsContextProvider>
            </ThemeContextProvider>
        </ErrorBoundary>
    );
}

export default App;
