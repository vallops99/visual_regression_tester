import { BrowserRouter } from "react-router-dom";

import { Navbar } from "./features";

import "./App.css";
import "./theme.css";

function App() {
    return (
        <BrowserRouter>
            <Navbar />
        </BrowserRouter>
    );
}

export default App;
