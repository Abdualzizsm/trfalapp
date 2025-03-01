import { FaExclamationTriangle, FaRedo, FaInfoCircle } from 'react-icons/fa';

export default function ErrorMessage({ message, onRetry }) {
  // تحديد نوع الخطأ وتقديم اقتراحات للحل
  const getErrorSuggestion = (errorMsg) => {
    if (errorMsg.includes('JSON') || errorMsg.includes('تحليل')) {
      return 'قد تكون هناك مشكلة في معالجة البيانات. يرجى المحاولة مرة أخرى.';
    } else if (errorMsg.includes('API') || errorMsg.includes('الاتصال')) {
      return 'قد تكون هناك مشكلة في الاتصال بالخدمة. تأكد من اتصالك بالإنترنت وحاول مرة أخرى.';
    } else if (errorMsg.includes('الذكاء الاصطناعي') || errorMsg.includes('استجابة')) {
      return 'لم يتمكن الذكاء الاصطناعي من إنشاء خطة سفر مناسبة. حاول تعديل تفاصيل رحلتك وجرب مرة أخرى.';
    }
    return 'يرجى التحقق من المعلومات المدخلة والمحاولة مرة أخرى.';
  };

  const suggestion = getErrorSuggestion(message);

  return (
    <div className="rounded-lg overflow-hidden">
      <div className="bg-red-50 border-r-4 border-ios-red p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0 pt-1">
            <FaExclamationTriangle className="h-6 w-6 text-ios-red" />
          </div>
          <div className="mr-3 flex-1">
            <h3 className="text-lg font-medium text-red-800">حدث خطأ</h3>
            <div className="mt-2 text-red-700">
              <p>{message}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 p-4 border-r-4 border-blue-400">
        <div className="flex">
          <div className="flex-shrink-0">
            <FaInfoCircle className="h-5 w-5 text-blue-400" />
          </div>
          <div className="mr-3">
            <p className="text-sm text-gray-700">{suggestion}</p>
          </div>
        </div>
      </div>
      
      {onRetry && (
        <div className="bg-gray-100 px-4 py-3 sm:px-6 flex justify-center">
          <button
            onClick={onRetry}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-ios-blue hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300"
          >
            <FaRedo className="ml-2" />
            إعادة المحاولة
          </button>
        </div>
      )}
    </div>
  );
}
