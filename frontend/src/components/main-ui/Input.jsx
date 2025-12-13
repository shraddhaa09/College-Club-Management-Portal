// src/components/ui/Input.jsx
const Input = ({ className = "", ...props }) => (
  <input
    className={`border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring focus:ring-blue-200 ${className}`}
    {...props}
  />
);
export { Input };
