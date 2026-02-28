import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  PlusCircle,
  BookOpen,
  Users,
  CreditCard,
  Settings,
  Menu,
  LogOut,
  Users2,
  Sun,
  Moon,
} from "lucide-react";

import { Link, NavLink, Outlet } from "react-router";
import UseAuth from "../hooks/UseAuth";
import { useAxiosSecure } from "../hooks/UseAxios";
import LoadingPage from "../components/Loader/LoadingPage";
import DashboardFooter from "./footerForDash";

export const DashboardLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState("light");

  const { currentUser, LoggOut } = UseAuth();
  const axios = useAxiosSecure();

  const [user, setUser] = useState("");
  const [loader, setLoader] = useState(false);

  /* ================= THEME INIT (NO STORAGE) ================= */
  useEffect(() => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    const defaultTheme = prefersDark ? "dark" : "light";

    setTheme(defaultTheme);
    document.documentElement.setAttribute("data-theme", defaultTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  /* ================= ROLE FETCH ================= */
  useEffect(() => {
    if (!currentUser) return;

    const fetchData = async () => {
      try {
        setLoader(true);
        const res = await axios.get("/private/userrole");
        setUser(res.data.role);
      } catch (error) {
        console.log(error);
      } finally {
        setLoader(false);
      }
    };

    fetchData();
  }, [currentUser, axios]);

  if (loader) return <LoadingPage />;

  /* ================= MENUS ================= */

  const studentMenu = [
    { name: "Overview", icon: <LayoutDashboard size={18} />, path: "/dashboard/student/", exact: true },
    { name: "My Tuitions", icon: <BookOpen size={18} />, path: "/dashboard/student/my-tuitions" },
    { name: "Post Tuition", icon: <PlusCircle size={18} />, path: "/dashboard/student/post-tuition" },
    { name: "Applications", icon: <Users size={18} />, path: "/dashboard/student/applications" },
    { name: "Payments", icon: <CreditCard size={18} />, path: "/dashboard/student/payments" },
    { name: "Settings", icon: <Settings size={18} />, path: "/dashboard/student/settings" },
  ];

  const teacherMenu = [
    { name: "Overview", icon: <LayoutDashboard size={18} />, path: "/dashboard/teacher/", exact: true },
    { name: "My Applications", icon: <BookOpen size={18} />, path: "/dashboard/teacher/my-applications" },
    { name: "Approved Tuitions", icon: <PlusCircle size={18} />, path: "/dashboard/teacher/approved-tuition" },
    { name: "Revenue History", icon: <Users size={18} />, path: "/dashboard/teacher/revenue-history" },
    { name: "Settings", icon: <Settings size={18} />, path: "/dashboard/teacher/settings" },
  ];

  const adminMenu = [
    { name: "Overview", icon: <LayoutDashboard size={18} />, path: "/dashboard/admin/", exact: true },
    { name: "Review Posts", icon: <BookOpen size={18} />, path: "/dashboard/admin/review-applications" },
    { name: "Manage Role", icon: <PlusCircle size={18} />, path: "/dashboard/admin/manage-role" },
    { name: "All Users", icon: <Users2 size={18} />, path: "/dashboard/admin/allusers" },
    { name: "Settings", icon: <Settings size={18} />, path: "/dashboard/admin/settings" },
  ];

  const menu =
    user === "student"
      ? studentMenu
      : user === "teacher"
      ? teacherMenu
      : adminMenu;

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-base-100 text-base-content flex">

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64
        bg-base-200 border-r border-base-300
        transform transition-transform duration-300
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      >
        {/* Header */}
        <div className="p-6 flex items-center justify-between border-b border-base-300">
          <Link to="/" className="font-bold text-lg">
            eTuitionBd
          </Link>

          <button
            onClick={toggleTheme}
            className="btn btn-sm btn-ghost"
          >
            {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {menu.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.exact}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition
                ${
                  isActive
                    ? "bg-primary text-primary-content"
                    : "hover:bg-base-300"
                }`
              }
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div onClick={LoggOut} className="mt-auto  p-4 border-t border-base-300 hover:cursor-pointer">
          <button className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-error hover:bg-error/10 transition">
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col min-w-0">

        {/* Mobile Topbar */}
        <div className="lg:hidden h-16 flex items-center px-4 border-b border-base-300 bg-base-100">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu size={22} />
          </button>
          <h1 className="ml-4 font-semibold">Dashboard</h1>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-10">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </div>

        <DashboardFooter />
      </main>
    </div>
  );
};