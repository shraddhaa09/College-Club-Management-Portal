import React from "react";

export function Card({ children, className }) {
  return (
    <div className={className || "bg-white shadow rounded-lg"}>
      {children}
    </div>
  );
}

export function CardHeader({ children }) {
  return <div className="p-6 border-b">{children}</div>;
}

export function CardContent({ children, className }) {
  return <div className={className || "p-6"}>{children}</div>;
}

export function CardTitle({ children }) {
  return <h3 className="text-xl font-semibold">{children}</h3>;
}
