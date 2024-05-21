import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./assets/css/init.css";
import "./assets/css/utils.css";
import "./assets/css/font.css";
import "./assets/css/keyframes.css";
import "./assets/css/index.css";
import "./assets/css/responsive.css";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./provider/AuthProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<AuthProvider>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</AuthProvider>
	</React.StrictMode>
);
