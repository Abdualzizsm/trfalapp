export default function LoadingSpinner({ message = 'جاري التحميل...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-16 w-16 text-ios-blue">
            <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        </div>
        <div className="h-16 w-16"></div>
      </div>
      <p className="text-gray-600 text-lg mt-4 font-medium">{message}</p>
      <div className="mt-4 flex space-x-2 rtl:space-x-reverse">
        <div className="h-2 w-2 bg-ios-blue rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="h-2 w-2 bg-ios-blue rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        <div className="h-2 w-2 bg-ios-blue rounded-full animate-bounce" style={{ animationDelay: '600ms' }}></div>
      </div>
    </div>
  );
}
