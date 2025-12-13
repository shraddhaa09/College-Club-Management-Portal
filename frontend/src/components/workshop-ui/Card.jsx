// Card, CardHeader, CardContent, CardTitle — composition for clean cards

export function Card({ children, className = "", ...props }) {
  return (
    <div className={`rounded-2xl bg-white shadow-md p-0 overflow-hidden ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className = "", ...props }) {
  return (
    <div className={`p-6 border-b border-gray-100 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className = "", ...props }) {
  return (
    <h2 className={`text-xl font-bold ${className}`} {...props}>
      {children}
    </h2>
  );
}

export function CardContent({ children, className = "", ...props }) {
  return (
    <div className={`p-6 flex flex-col gap-2 ${className}`} {...props}>
      {children}
    </div>
  );
}
