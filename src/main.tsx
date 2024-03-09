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
  WatchHistory,
  Video,
  Channel,
  ChannelNotFound,
  Dashboard,
  Search,
  Playlist,
  LikedVideos,
  Subscribers,
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
            <WatchHistory />
          </AuthLayout>
        ),
      },
      {
        path: "/liked-videos",
        element: (
          <AuthLayout authentication={true}>
            <LikedVideos />
          </AuthLayout>
        ),
      },
      {
        path: "/subscribers",
        element: (
          <AuthLayout authentication={true}>
            <Subscribers />
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
        path: "/v/:search",
        element: (
          <AuthLayout authentication={true}>
            <Search />
          </AuthLayout>
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
        path: "/:channelName/playlist/:playlist",
        element: (
          <AuthLayout authentication={true}>
            <Playlist />
          </AuthLayout>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <AuthLayout authentication={true}>
            <Dashboard />
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
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
    <Toaster />
  </Provider>
);
