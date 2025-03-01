export default function LoadingSpinner({ message = 'جاري التحميل...' }) {
  return (
    <div className="ios-card flex flex-col items-center justify-center py-12">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-ios-blue mb-4"></div>
      <p className="text-gray-600 text-lg">{message}</p>
    </div>
  );
}
