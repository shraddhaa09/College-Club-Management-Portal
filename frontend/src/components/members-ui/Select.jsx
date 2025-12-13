import React, { useState, useRef, useEffect } from "react";

export function Select({ children, value, onValueChange }) {
  const [open, setOpen] = useState(false);
  const selectRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div ref={selectRef} className="relative">
      {React.Children.map(children, child => {
        if (!child) return null;
        
        // Clone children and pass down props
        if (child.type === SelectTrigger) {
          return React.cloneElement(child, { open, setOpen, value });
        }
        if (child.type === SelectContent) {
          return React.cloneElement(child, { open, setOpen, onValueChange });
        }
        return child;
      })}
    </div>
  );
}

export function SelectTrigger({ children, className, open, setOpen }) {
  return (
    <button
      type="button"
      onClick={() => setOpen(!open)}
      className={`w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-left flex items-center justify-between hover:bg-gray-50 transition ${className || ""}`}
    >
      <span className="flex-1">{children}</span>
      <svg
        className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  );
}

export function SelectValue({ placeholder, value }) {
  // Display the current value or placeholder
  const displayValue = value && value !== "all" ? value : placeholder;
  
  return (
    <span className={value ? "text-gray-900" : "text-gray-500"}>
      {displayValue}
    </span>
  );
}

export function SelectContent({ children, open, setOpen, onValueChange }) {
  if (!open) return null;

  return (
    <div className="absolute z-50 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
      {React.Children.map(children, child => {
        if (!child) return null;
        return React.cloneElement(child, { onValueChange, setOpen });
      })}
    </div>
  );
}

export function SelectItem({ children, value, onValueChange, setOpen }) {
  return (
    <div
      onClick={() => {
        if (onValueChange) {
          onValueChange(value);
        }
        if (setOpen) {
          setOpen(false);
        }
      }}
      className="px-3 py-2 hover:bg-blue-50 cursor-pointer text-sm transition"
    >
      {children}
    </div>
  );
}
