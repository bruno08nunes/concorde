import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./routes/login.tsx";
import Register from "./routes/register.tsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [],
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
]);

createRoot(document.getElementById("root")!).render(
    <QueryClientProvider client={queryClient}>
        <StrictMode>
            <RouterProvider router={router} />
        </StrictMode>
    </QueryClientProvider>,
);
