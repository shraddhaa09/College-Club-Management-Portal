// src/components/ui/Button.jsx
const Button = ({ children, className = "", variant = "default", ...props }) => {
  const styles = variant === "outline"
    ? "border border-gray-400 text-gray-700 bg-white hover:bg-gray-100"
    : "bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700";
  return (
    <button className={`px-4 py-2 rounded font-medium ${styles} ${className}`} {...props}>
      {children}
    </button>
  );
};

export { Button };
