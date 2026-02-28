import { createBrowserRouter } from "react-router";
import Homepage from "../../pages/home/Homepage";
import HomeLayout from "../../layouts/HomeLayout";
import ErrorPage from "../../pages/error/ErrorPage";
import Aboutpage from "../../pages/about/Aboutpage";
import Contactpage from "../../pages/contact/Contactpage";
import LoginPage from "../../pages/Auth/LoginPage";
import Registerpage from "../../pages/Auth/Registerpage";
import LoadingPage from "../../components/Loader/LoadingPage";
import { PrivateApiCalls } from "./PrivateApiCalls.routes";
import {DashboardLayout} from "../../layouts/DashboardLayout";
import PrivateRoute from "./PrivateRoutes";
import StudentDashboard from "../../pages/dashboards/student/StudentDashboard";
import MyTuitions from "../../pages/dashboards/student/components/MyTuitions";
import PostTuition from "../../pages/dashboards/student/components/PostTuition";
import TeachingApplications from "../../pages/dashboards/student/components/TeachingApplications";
import Payments from "../../pages/dashboards/student/components/Payment";
import ProfileSettings from "../../pages/dashboards/student/components/ProfileSettings";
import Overview from "../../pages/dashboards/student/components/Overview";
import TeacherOverview from "../../pages/dashboards/teacher/components/TeachingOverview";
import TeacherApplications from "../../pages/dashboards/teacher/components/TeacherApplications";
import ApprovedTuition from "../../pages/dashboards/teacher/components/ApprovedTuitions";
import RevenueHistory from "../../pages/dashboards/teacher/components/RevenueHistory";
import TeacherDashboard from "../../pages/dashboards/teacher/TeacherDashboard"
import AdminDashboard from "../../pages/dashboards/ADMIN/AdminDashboard";
import AdminOverview from "../../pages/dashboards/ADMIN/components/AdminOverview";
import ReviewApplications from "../../pages/dashboards/ADMIN/components/ApplicationReview";
import PendingTuition from "../../pages/dashboards/ADMIN/components/PendingTuitions";
import PendingTutors from "../../pages/dashboards/ADMIN/components/PendingTutors";
import DashboardHome from "../../pages/dashboards/DashboardHome";
import RequireRole from "../protectedroleRoutes/RequireRole";

export const GeneralRouter = createBrowserRouter([
  {
    path: "/",
    Component: HomeLayout,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        loader: async () => {
          const [allPosts, allTeachers] = await Promise.all([
            fetch(`${import.meta.env.VITE_ServerLink}/api/latestposts/all`),
            fetch(`${import.meta.env.VITE_ServerLink}/api/allteachers`),
          ]);

          const Posts = await allPosts.json();
          const Teachers = await allTeachers.json();
          return { Posts, Teachers };
        },

        path: "/",
        Component: Homepage,
        hydrateFallbackElement: <LoadingPage></LoadingPage>,
      },
      {
        path: "/about",
        Component: Aboutpage,
      },
      {
        path: "/contact",
        Component: Contactpage,
      },
      {
        path: "/signin",
        Component: LoginPage,
      },
      {
        path: "/register",
        Component: Registerpage,
      },
      ...PrivateApiCalls
    ],
  },
  {
  path: "/dashboard",
  element: (
    <PrivateRoute>
      <DashboardLayout />
    </PrivateRoute>
  ),
  errorElement: <ErrorPage />,
  children: [

    // Role detector
    {
      index: true,
      element: <DashboardHome />
    },

    /* ================= STUDENT ================= */
    {
      path: "student",
      element:<RequireRole allowedRole="student">
      <StudentDashboard />
    </RequireRole>,
      children: [
        { index: true, element: <Overview /> }, // ✅ default page
        { path: "my-tuitions", element: <MyTuitions /> },
        { path: "post-tuition", element: <PostTuition /> },
        { path: "applications", element: <TeachingApplications /> },
        { path: "payments", element: <Payments /> },
        { path: "settings", element: <ProfileSettings /> },
      ],
    },

    /* ================= TEACHER ================= */
    {
      path: "teacher",
      element: <RequireRole allowedRole="teacher">
      <TeacherDashboard />
    </RequireRole>,
      children: [
        { index: true, element: <TeacherOverview /> }, // ✅ default page
        { path: "my-applications", element: <TeacherApplications /> },
        { path: "approved-tuition", element: <ApprovedTuition /> },
        { path: "revenue-history", element: <RevenueHistory /> },
        { path: "settings", element: <ProfileSettings /> },
      ],
    },

    /* ================= ADMIN ================= */
    {
      path: "admin",
      element: <RequireRole allowedRole="admin">
      <AdminDashboard />
    </RequireRole>,
      children: [
        { index: true, element: <AdminOverview /> }, // ✅ default page
        { path: "review-applications", element: <ReviewApplications /> },
        { path: "allusers", element: <PendingTuition /> },
        { path: "manage-role", element: <PendingTutors /> },
        { path: "settings", element: <ProfileSettings /> },
      ],
    },
  ],
}

]);
