import React from "react";

export function Card({ children, className }) {
  return (
    <div className={className || "bg-white shadow rounded-lg p-4"}>
      {children}
    </div>
  );
}

export function CardHeader({ children }) {
  return (
    <div className="mb-2 font-bold text-lg">{children}</div>
  );
}

export function CardContent({ children }) {
  return (
    <div>{children}</div>
  );
}

export function CardTitle({ children }) {
  return (
    <div className="font-semibold text-xl">{children}</div>
  );
}
