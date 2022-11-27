import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  // query
  const { data: loadedUser = [] } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/users`);
      const data = await res.json();
      return data;
    },
  });
  // console.log(loadedUser);
  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((err) => console.log(err));
  };
  return (
    <div className="navbar bg-base-100 ">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/blog">Blog</Link>
            </li>
            {user?.uid ? (
              <li>
                <Link onClick={handleLogOut} className="btn btn-outline">
                  Signout
                </Link>
              </li>
            ) : (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          UsedPhones Hub
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-0 gap-2">
          <li>
            <Link className="btn btn-ghost rounded-lg " to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="btn btn-ghost" to="/blog">
              Blog
            </Link>
          </li>
          {user?.uid ? (
            <li>
              <Link
                onClick={handleLogOut}
                className="btn btn-outline btn-error rounded-lg"
              >
                Signout
              </Link>
            </li>
          ) : (
            <li>
              <Link
                className="btn btn-outline btn-error rounded-lg"
                to="/login"
              >
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
      {/* <div className="navbar-end">
        <Link to="" className="btn">
          Get started
        </Link>
      </div> */}
    </div>
  );
};

export default Navbar;
