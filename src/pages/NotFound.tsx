
import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-clms-blue mb-4">404</h1>
        <p className="text-xl text-gray-700 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link 
          to="/" 
          className="bg-clms-lightBlue hover:bg-clms-blue text-white px-6 py-3 rounded-md inline-block transition-colors"
        >
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
