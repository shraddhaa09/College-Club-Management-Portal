export function Textarea({ 
  className = "", 
  rows = 3, 
  ...props 
}) {
  return (
    <textarea
      rows={rows}
      className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
        focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
        resize-none disabled:bg-gray-100 disabled:cursor-not-allowed ${className}`}
      {...props}
    />
  );
}
