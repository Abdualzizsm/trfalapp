import React from 'react';

export default function LoadingIndicator() {
  const steps = [
    "جمع معلومات عن الوجهة...",
    "البحث عن أفضل الأماكن للزيارة...",
    "إنشاء جدول زمني مثالي...",
    "تحسين توزيع الميزانية...",
    "إضافة نصائح وتوصيات خاصة...",
    "تجهيز خطة سفر استثنائية لك..."
  ];
  
  const [currentStep, setCurrentStep] = React.useState(0);
  
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep(prev => (prev + 1) % steps.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="ios-card max-w-2xl mx-auto text-center py-12" dir="rtl">
      <div className="flex justify-center mb-6">
        <div className="w-24 h-24 rounded-full border-4 border-ios-blue border-t-transparent animate-spin"></div>
      </div>
      
      <h2 className="text-2xl font-bold text-ios-blue mb-4">جاري إنشاء خطة السفر</h2>
      
      <div className="h-8">
        <p className="text-gray-600 animate-pulse">{steps[currentStep]}</p>
      </div>
      
      <div className="mt-8 bg-ios-light-gray h-2 rounded-full max-w-md mx-auto overflow-hidden">
        <div 
          className="bg-ios-blue h-full rounded-full transition-all duration-500"
          style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
        ></div>
      </div>
      
      <p className="text-gray-500 mt-4 text-sm">
        نحن نستخدم الذكاء الاصطناعي Google Gemini لإنشاء خطة سفر مخصصة خصيصًا لاحتياجاتك.
        <br />
        هذه العملية قد تستغرق بضع ثوانٍ.
      </p>
    </div>
  );
}
