import React from "react";

export function Button({ children, onClick, variant = "default", size = "default", className, ...props }) {
  const baseClass = "rounded font-medium transition inline-flex items-center justify-center";
  
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    ghost: "hover:bg-gray-100 text-gray-700",
    outline: "border border-gray-300 bg-white hover:bg-gray-50",
  };
  
  const sizes = {
    default: "px-4 py-2",
    sm: "px-3 py-1 text-sm",
    icon: "p-2",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClass} ${variants[variant]} ${sizes[size]} ${className || ""}`}
      {...props}
    >
      {children}
    </button>
  );
}
