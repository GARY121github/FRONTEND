import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { store } from "@/store/store.ts";
import { Provider } from "react-redux";
import { Toaster } from "@/components/ui/toaster";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AuthLayout from "@/components/Layout/auth-layout";
import {
  Home,
  Auth,
  History,
  Video,
  Channel,
  ChannelNotFound,
} from "@/pages/index";

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
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Auth login={true} />
          </AuthLayout>
        ),
      },
      {
        path: "/register",
        element: (
          <AuthLayout authentication={false}>
            <Auth login={false} />
          </AuthLayout>
        ),
      },
      {
        path: "/history",
        element: (
          <AuthLayout authentication={true}>
            <History />
          </AuthLayout>
        ),
      },
      {
        path: "/video/:id",
        element: (
          // <AuthLayout authentication={true}>
          <Video />
          // </AuthLayout>
        ),
      },
      {
        path: "/:channelName",
        element: (
          <AuthLayout authentication={true}>
            <Channel />
          </AuthLayout>
        ),
      },
      {
        path: "/channel-not-found",
        element: (
          <AuthLayout authentication={true}>
            <ChannelNotFound />
          </AuthLayout>
        ),
      },
      {
        path: "/video/videoModal",
        element: <VideoUploadModal />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <Toaster />
    </Provider>
  </React.StrictMode>
);
