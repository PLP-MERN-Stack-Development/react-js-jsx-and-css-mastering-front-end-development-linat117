import React from "react";

export default function Card({ children, className = "" }) {
  return (
    <div
      className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 ${className}`}
    >
      {children}
    </div>
  );
}
