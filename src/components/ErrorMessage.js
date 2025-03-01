import { FaExclamationTriangle, FaRedo } from 'react-icons/fa';

export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="ios-card bg-red-50 border-r-4 border-ios-red">
      <div className="flex items-start">
        <div className="flex-shrink-0 pt-1">
          <FaExclamationTriangle className="h-6 w-6 text-ios-red" />
        </div>
        <div className="mr-3 flex-1">
          <h3 className="text-lg font-medium text-red-800">حدث خطأ</h3>
          <div className="mt-2 text-red-700">
            <p>{message}</p>
          </div>
          {onRetry && (
            <button
              onClick={onRetry}
              className="mt-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-ios-red hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <FaRedo className="ml-2" />
              إعادة المحاولة
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
