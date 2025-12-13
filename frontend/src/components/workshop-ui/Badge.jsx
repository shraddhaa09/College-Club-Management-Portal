// Badge with support for solid or outline variants

export function Badge({ children, variant = "solid", className = "", ...props }) {
  const base = "inline-block px-3 py-0.5 text-xs rounded-full font-semibold";
  const styles = {
    solid: "bg-purple-500 text-white",
    outline: "border border-purple-300 text-purple-700 bg-transparent",
  };

  return (
    <span className={`${base} ${styles[variant] || ""} ${className}`} {...props}>
      {children}
    </span>
  );
}
