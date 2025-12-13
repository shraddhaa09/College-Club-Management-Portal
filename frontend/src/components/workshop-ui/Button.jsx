// Basic generic Button, accepts all props and children (with custom styles)

export function Button({ children, className = "", variant = "primary", ...props }) {
  let base =
    "inline-flex gap-2 items-center justify-center font-semibold px-4 py-2 rounded-lg transition focus:outline-none";
  let variants = {
    primary: "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow hover:scale-105",
    outline: "bg-white border border-purple-200 text-purple-700 hover:bg-purple-50",
    ghost: "bg-transparent text-purple-600 hover:bg-purple-100",
  };

  return (
    <button className={`${base} ${variants[variant] || ""} ${className}`} {...props}>
      {children}
    </button>
  );
}

export default Button;
