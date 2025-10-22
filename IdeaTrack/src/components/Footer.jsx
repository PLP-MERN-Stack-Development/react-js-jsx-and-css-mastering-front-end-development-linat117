import React from "react";

export default function Footer() {
  return (
    <footer className="mt-8 py-6 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 text-center text-sm text-gray-600 dark:text-gray-400">
        © {new Date().getFullYear()} IdeaTrack · Built with React & Tailwind by <a href="https://github.com/linat117/" className="text-blue-600 dark:text-white">Hilina Teshome</a>
      </div>
    </footer>
  );
}
