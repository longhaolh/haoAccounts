import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { Suspense } from "react";
const Month = lazy(() => import('@/views/month'))
const Year = lazy(() => import('@/views/year'))
const Layout = lazy(() => import('@/views/layout'))
import LoadingPage from "@/loadingPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<LoadingPage />}>
        <Layout />
      </Suspense>
    ),
    children: [
      {
        path: "/month",
        element: (
          <Suspense fallback={<LoadingPage />}>
            <Month />
          </Suspense>
        ),
      },
      {
        path: "/year",
        element: (
          <Suspense fallback={<LoadingPage />}>
            <Year />
          </Suspense>
        ),
      }
    ],
  },
]);
export default router
