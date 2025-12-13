import React from "react";

export function Table({ children }) {
  return <table className="w-full">{children}</table>;
}

export function TableHeader({ children }) {
  return <thead className="bg-gray-50">{children}</thead>;
}

export function TableBody({ children }) {
  return <tbody>{children}</tbody>;
}

export function TableRow({ children, className }) {
  return <tr className={`border-b hover:bg-gray-50 transition ${className || ""}`}>{children}</tr>;
}

export function TableHead({ children, className }) {
  return <th className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase ${className || ""}`}>{children}</th>;
}

export function TableCell({ children, className, colSpan }) {
  return <td colSpan={colSpan} className={`px-6 py-4 ${className || ""}`}>{children}</td>;
}
