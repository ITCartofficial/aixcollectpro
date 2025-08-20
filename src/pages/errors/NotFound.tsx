import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6">
          <h1 className="text-6xl font-bold text-neutral-300 mb-2">404</h1>
          <h2 className="text-2xl font-semibold text-neutral-700 mb-4">
            Page Not Found
          </h2>
          <p className="text-neutral-600 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link to="/dashboard">
            <button className="w-full">
              Go to Dashboard
            </button>
          </Link>
          
          <Link to="/" className="block text-primary-600 hover:text-primary-700">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;