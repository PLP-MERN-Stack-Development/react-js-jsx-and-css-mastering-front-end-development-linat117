import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import Button from "./Button";

export default function Navbar() {
  const { toggle, theme } = useContext(ThemeContext);
  const loc = useLocation();

  const linkClass = (p) =>
    `px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
      loc.pathname === p
        ? "bg-blue-600 text-white dark:bg-gray-700 dark:text-white"
        : "hover:bg-blue-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
    }`;

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md border-b-2 border-blue-500 dark:border-gray-700">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-2xl font-bold text-blue-600 dark:text-white">
            IdeaTrack
          </Link>
          <nav className="hidden sm:flex gap-2">
            <Link to="/notes" className={linkClass("/notes")}>
              Notes
            </Link>
            <Link to="/api" className={linkClass("/api")}>
              API Data
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" onClick={toggle}>
            {theme === "light" ? "🌙 Dark" : "☀️ Light"}
          </Button>
        </div>
      </div>
    </header>
  );
}
