import { BrowserRouter } from "react-router-dom";

import { Navbar } from "./features";
import { ThemeWrapper } from "./AppStyles";
import { ThemeContextProvider } from "./utils";

import "./App.css";

function App() {
    return (
        <ThemeContextProvider>
            <ThemeWrapper>
                <BrowserRouter>
                    <Navbar />
                </BrowserRouter>
            </ThemeWrapper>
        </ThemeContextProvider>
    );
}

export default App;
