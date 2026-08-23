import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./routes/App.tsx";
import { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./routes/login.tsx";
import Register from "./routes/register.tsx";
import MessagesPage from "./routes/messagesPage.tsx";
import NotificationPage from "./routes/notificationPage.tsx";
import Home from "./routes/home.tsx";
import UserInfo from "./routes/userInfo.tsx";
import ConfigPage from "./routes/config.tsx";
import { WebRTCProvider } from "./contexts/WebRTCProvider.tsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/amigos/:username",
                element: <MessagesPage />,
            },
            {
                path: "/usuarios/:username",
                element: <UserInfo />,
            },
            {
                path: "/notificacoes",
                element: <NotificationPage />,
            },
            {
                path: "/configuracoes",
                element: <ConfigPage />,
            },
        ],
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
            <WebRTCProvider>
                <RouterProvider router={router} />
            </WebRTCProvider>
        </StrictMode>
    </QueryClientProvider>,
);
