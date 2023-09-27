import React from "react";
import App from "./components/App";
import 'semantic-ui-css/semantic.min.css'

import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
    );
