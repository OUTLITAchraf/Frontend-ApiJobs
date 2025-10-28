import {
  Briefcase,
  User,
  Settings,
  LogOut,
  ChevronDown,
  ClipboardList,
} from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { userLogout } from "../features/AuthSlice";

function AuthLayout() {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const role = user.roles?.[0]?.name;

  const handleLogout = async () => {
    await dispatch(userLogout());
    navigate("/login");
  };

  return (
    <>
      {role === "user" && (
        <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              {/* Logo */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <Briefcase className="w-7 h-7 text-white" />
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-2xl font-bold text-indigo-600">
                    JobPortal
                  </h1>
                  <p className="text-xs text-gray-600">Find Your Dream Job</p>
                </div>
              </div>

              {/* Empty space for centering */}
              <div className="flex-1"></div>

              {/* User Menu - Right */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-xl transition-all"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div className="hidden lg:block text-left">
                      <p className="text-sm font-semibold text-gray-900">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-600">{user.email}</p>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-600 transition-transform ${
                        showUserMenu ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* User Dropdown Menu */}
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 z-50">
                      <div className="px-4 py-3 border-b border-gray-200">
                        <p className="text-sm font-semibold text-gray-900">
                          {user.name}
                        </p>
                        <p className="text-xs text-gray-600">{user.email}</p>
                      </div>
                      <button className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 text-gray-700 transition-colors">
                        <User className="w-5 h-5" />
                        <span>My Profile</span>
                      </button>
                      <button className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 text-gray-700 transition-colors">
                        <ClipboardList className="w-5 h-5" />
                        <span>My Applications</span>
                      </button>

                      <div className="border-t border-gray-200 mt-2 pt-2">
                        <button
                          className="w-full px-4 py-3 text-left hover:bg-red-50 flex items-center gap-3 text-red-600 transition-colors"
                          onClick={handleLogout}
                        >
                          <LogOut className="w-5 h-5" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>
      )}
      <Outlet />
    </>
  );
}

export default AuthLayout;
