// src/components/Error.js
import { useRouteError } from "react-router-dom";
import { Link } from "react-router-dom";

const Error = () => {
  const err = useRouteError();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Oops!</h1>
        <h2 className="text-xl text-gray-600 mb-4">
          Something went wrong!
        </h2>
        <h3 className="text-lg text-red-500 mb-6">
          {err.status}: {err.statusText}
        </h3>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Error;
