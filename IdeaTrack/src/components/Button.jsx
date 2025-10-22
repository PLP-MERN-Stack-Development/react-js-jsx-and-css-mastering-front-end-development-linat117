import React from "react";
//import clsx from "clsx"; // optional; but we can just use template strings if not installed

export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}) {
  const base =
    "px-5 py-2.5 rounded-lg font-semibold transition-all duration-200 active:scale-95";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600",
    secondary:
      "bg-green-500 text-white hover:bg-green-600 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700",
    danger: "bg-red-500 text-white hover:bg-red-600 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700",
  };

  return (
    <button
      className={`${base} ${
        variants[variant] || variants.primary
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
