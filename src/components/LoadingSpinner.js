import { FaPlane, FaMapMarkedAlt, FaSuitcase } from 'react-icons/fa';

export default function LoadingSpinner({ message = 'جاري التحميل...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="relative">
        <div className="h-24 w-24 relative">
          {/* دائرة خارجية */}
          <div className="absolute inset-0">
            <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          
          {/* أيقونات متحركة */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative h-12 w-12">
              <FaPlane 
                className="absolute text-ios-blue animate-pulse" 
                style={{ 
                  fontSize: '1.5rem',
                  opacity: 0.8,
                  top: '0%',
                  left: '50%',
                  transform: 'translate(-50%, -50%) rotate(-45deg)',
                  animation: 'fly 3s infinite'
                }} 
              />
              <FaMapMarkedAlt 
                className="absolute text-red-500" 
                style={{ 
                  fontSize: '1.5rem',
                  opacity: 0.8,
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  animation: 'pulse 2s infinite'
                }} 
              />
              <FaSuitcase 
                className="absolute text-yellow-500" 
                style={{ 
                  fontSize: '1.5rem',
                  opacity: 0.8,
                  bottom: '0%',
                  left: '50%',
                  transform: 'translate(-50%, 50%)',
                  animation: 'bounce 2.5s infinite'
                }} 
              />
            </div>
          </div>
        </div>
      </div>
      
      <p className="text-gray-700 text-lg mt-6 font-medium">{message}</p>
      
      <div className="mt-4 flex space-x-2 rtl:space-x-reverse">
        <div className="h-2 w-2 bg-ios-blue rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="h-2 w-2 bg-ios-blue rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        <div className="h-2 w-2 bg-ios-blue rounded-full animate-bounce" style={{ animationDelay: '600ms' }}></div>
      </div>
      
      <style jsx>{`
        @keyframes fly {
          0%, 100% { transform: translate(-50%, -50%) rotate(-45deg) translateY(0); }
          50% { transform: translate(-50%, -50%) rotate(-45deg) translateY(-10px); }
        }
        @keyframes pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.2); }
        }
        @keyframes bounce {
          0%, 100% { transform: translate(-50%, 50%); }
          50% { transform: translate(-50%, 30%); }
        }
      `}</style>
    </div>
  );
}
