// src/components/ui/Card.jsx
const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-xl shadow p-6 ${className}`}>{children}</div>
);

const CardHeader = ({ children, className = "" }) => (
  <div className={`mb-4 ${className}`}>{children}</div>
);

const CardContent = ({ children, className = "" }) => (
  <div className={className}>{children}</div>
);

const CardTitle = ({ children, className = "" }) => (
  <h2 className={`text-xl font-semibold ${className}`}>{children}</h2>
);

export { Card, CardHeader, CardContent, CardTitle };
