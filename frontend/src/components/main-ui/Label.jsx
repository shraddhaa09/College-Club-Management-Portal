// src/components/ui/Label.jsx
const Label = ({ children, className = "", ...props }) => (
  <label className={`block mb-1 font-medium text-gray-700 ${className}`} {...props}>
    {children}
  </label>
);

export { Label };
