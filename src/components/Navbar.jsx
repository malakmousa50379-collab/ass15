import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  }

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/90 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-2 py-1.5 sm:gap-3 sm:px-3">

    
        <div className="flex items-center gap-3">
          <img
            src="/route.png"
            alt="Route Posts"
            className="h-9 w-9 rounded-xl object-cover"
          />

          <p className="hidden text-xl font-extrabold text-slate-900 sm:block">
            Route Posts
          </p>
        </div>

      
        <nav className="flex min-w-0 items-center gap-1 overflow-x-auto rounded-2xl border border-slate-200 bg-slate-50/90 px-1 py-1 sm:px-1.5">

          <NavLink
            to="/"
            className={({ isActive }) =>
              `relative flex items-center gap-1.5 rounded-xl px-2.5 py-2 text-sm font-extrabold transition sm:gap-2 sm:px-3.5 ${
                isActive
                  ? "bg-white text-[#1f6fe5]"
                  : "text-slate-600 hover:bg-white/90 hover:text-slate-900"
              }`
            }
          >
            <span className="text-lg">⌂</span>

            <span className="hidden sm:inline">
              Feed
            </span>

            <span className="sr-only sm:hidden">
              Feed
            </span>
          </NavLink>

          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `relative flex items-center gap-1.5 rounded-xl px-2.5 py-2 text-sm font-extrabold transition sm:gap-2 sm:px-3.5 ${
                isActive
                  ? "bg-white text-[#1f6fe5]"
                  : "text-slate-600 hover:bg-white/90 hover:text-slate-900"
              }`
            }
          >
            <span className="text-lg">♙</span>

            <span className="hidden sm:inline">
              Profile
            </span>

            <span className="sr-only sm:hidden">
              Profile
            </span>
          </NavLink>

          <NavLink
            to="/notifications"
            className={({ isActive }) =>
              `relative flex items-center gap-1.5 rounded-xl px-2.5 py-2 text-sm font-extrabold transition sm:gap-2 sm:px-3.5 ${
                isActive
                  ? "bg-white text-[#1f6fe5]"
                  : "text-slate-600 hover:bg-white/90 hover:text-slate-900"
              }`
            }
          >
            <span className="text-lg">◯</span>

            <span className="hidden sm:inline">
              Notifications
            </span>

            <span className="sr-only sm:hidden">
              Notifications
            </span>
          </NavLink>

        </nav>

      
        <div className="relative">

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-2 py-1.5 transition hover:bg-slate-100"
          >

            <img
              src={
                user?.photo ||
                "https://pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev/linkedPosts/default-profile.png"
              }
              alt={user?.name || "User"}
              className="h-8 w-8 rounded-full object-cover"
            />

            <span className="hidden max-w-[140px] truncate text-sm font-semibold text-slate-800 md:block">
              {user?.name || "User"}
            </span>

            <span className="text-lg text-slate-500">
              ☰
            </span>

          </button>

         
          {menuOpen && (
            <div className="absolute right-0 top-12 z-50 w-52 rounded-2xl border border-slate-200 bg-white p-2 shadow-lg">

              <button
                onClick={() => {
                  setMenuOpen(false);
                  navigate("/profile");
                }}
                className="w-full rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                Profile
              </button>

              <button
                onClick={() => {
                  setMenuOpen(false);
                  navigate("/change-password");
                }}
                className="w-full rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                Change Password
              </button>

              <div className="my-1 border-t border-slate-200" />

              <button
                onClick={handleLogout}
                className="w-full rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-red-500 transition hover:bg-red-50"
              >
                Logout
              </button>

            </div>
          )}

        </div>

      </div>
    </header>
  );
}

export default Navbar;