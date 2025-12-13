export function Button({ 
  children, 
  className = "", 
  variant = "default",
  type = "button",
  disabled = false,
  onClick,
  ...props 
}) {
  const baseStyles = "px-4 py-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    default: "bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:from-purple-600 hover:to-indigo-600",
    outline: "border-2 border-purple-500 text-purple-500 hover:bg-purple-50",
    ghost: "text-gray-700 hover:bg-gray-100"
  };
  
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
