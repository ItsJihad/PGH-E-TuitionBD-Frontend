import React from 'react'
import UseAuth from '../../hooks/UseAuth';

function TutorSideBar() {
  const { LoggOut } = UseAuth();
  return (
    <div className="drawer md:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle " />

      <div className="drawer-content">
        <MobileNav></MobileNav>
        <div className="p-4">{outlet}</div>
      </div>

      <div className="drawer-side">
        <label
          htmlFor="my-drawer-4"
          className="drawer-overlay lg:hidden"
        ></label>

        <div className="flex min-h-full flex-col items-center justify-start lg:pt-15 bg-base-200 lg:w-64 p-4">
          <Link to="/" className="flex items-center gap-2 mb-4">
            <img src="/assets/favicon.png" className="h-8 w-8" />
            <span className="font-bold hidden lg:block">E-Tuition BD</span>
          </Link>

          <ul className="menu gap-3 text-lg font-[ubuntu]">
            <li className=" rounded p-2 shadow-sm shadow-gray-300">
              <Link to="/">
                <House />
                <span className="hidden lg:block">Homepage</span>
              </Link>
            </li>

            

            <li className=" rounded p-2 shadow-sm shadow-gray-300">
              <Link to="/dashboard/my-tuition">
                <BookOpen />
                <span className="hidden lg:block">My Tuitions</span>
              </Link>
            </li>

            <li className=" rounded p-2 shadow-sm shadow-gray-300">
              <Link to="/dashboard/post-tuition">
                <NotebookPen />
                <span className="hidden lg:block">Post Tuition</span>
              </Link>
            </li>

            <li className=" rounded p-2 shadow-sm shadow-gray-300">
              <Link to="/dashboard/applied-tutors">
                <School />
                <span className="hidden lg:block">Applied Tutors</span>
              </Link>
            </li>

            <li className=" rounded p-2 shadow-sm shadow-gray-300">
              <Link to="/dashboard/payments">
                <CreditCard />
                <span className="hidden lg:block">Payments</span>
              </Link>
            </li>

            <li className=" rounded p-2 shadow-sm shadow-gray-300">
              <Link to="/dashboard/profile">
                <Bolt />
                <span className="hidden lg:block">Settings</span>
              </Link>
            </li>

            <li onClick={LoggOut} className=" rounded hover:cursor-pointer p-2 shadow-sm shadow-gray-300">
              <Link to="/">
                <LogOut />
                <span className="hidden lg:block">Logout</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default TutorSideBar
