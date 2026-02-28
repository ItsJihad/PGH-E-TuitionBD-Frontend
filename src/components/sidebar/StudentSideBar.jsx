import {
  House,
  BookOpen,
  NotebookPen,
  School,
  CreditCard,
  Bolt,
  LogOut,
} from "lucide-react";

import { NavLink, Link } from "react-router";
import MobileNav from "../mobileNav/MobileNav";
import { SiEducative } from "react-icons/si";

function StudentSideBar({ outlet }) {
  return (
    <div className="drawer md:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

      {/* ================= CONTENT ================= */}
      <div className="drawer-content bg-base-100 text-base-content min-h-screen">
        <MobileNav />
        <div className="p-6">{outlet}</div>
      </div>

      {/* ================= SIDEBAR ================= */}
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-4"
          className="drawer-overlay md:hidden"
        ></label>

        <aside className="w-64 bg-base-200 border-r border-base-300 min-h-screen p-6 flex flex-col">

          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3 mb-10">
            <SiEducative></SiEducative>
            <span className="font-bold text-lg">
              eTuitionBd
            </span>
          </Link>

          {/* MENU */}
          <ul className="menu text-sm gap-2 flex-1">

            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "active bg-primary text-primary-content"
                    : ""
                }
              >
                <House size={18} />
                Homepage
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard/my-tuition"
                className={({ isActive }) =>
                  isActive
                    ? "active bg-primary text-primary-content"
                    : ""
                }
              >
                <BookOpen size={18} />
                My Tuitions
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard/post-tuition"
                className={({ isActive }) =>
                  isActive
                    ? "active bg-primary text-primary-content"
                    : ""
                }
              >
                <NotebookPen size={18} />
                Post Tuition
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard/applied-tutors"
                className={({ isActive }) =>
                  isActive
                    ? "active bg-primary text-primary-content"
                    : ""
                }
              >
                <School size={18} />
                Applied Tutors
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard/payments"
                className={({ isActive }) =>
                  isActive
                    ? "active bg-primary text-primary-content"
                    : ""
                }
              >
                <CreditCard size={18} />
                Payments
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard/profile"
                className={({ isActive }) =>
                  isActive
                    ? "active bg-primary text-primary-content"
                    : ""
                }
              >
                <Bolt size={18} />
                Settings
              </NavLink>
            </li>

          </ul>

          {/* LOGOUT */}
          <div className="pt-6 border-t border-base-300">
            <Link
              to="/"
              className="flex items-center gap-2 text-sm hover:text-error transition"
            >
              <LogOut size={18} />
              Logout
            </Link>
          </div>

        </aside>
      </div>
    </div>
  );
}

export default StudentSideBar;