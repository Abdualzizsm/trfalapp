import { useState } from 'react';
import { FaMagic, FaSpinner } from 'react-icons/fa';
import axios from 'axios';

/**
 * زر تحسين خطة السفر باستخدام OpenAI
 * @param {Object} travelPlan - خطة السفر الحالية
 * @param {Function} onEnhancedPlan - دالة تُستدعى عند الحصول على خطة محسنة
 */
const EnhancePlanButton = ({ travelPlan, onEnhancedPlan }) => {
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [error, setError] = useState(null);

  const enhancePlan = async () => {
    setIsEnhancing(true);
    setError(null);

    try {
      const response = await axios.post('/api/enhancePlan', travelPlan);
      onEnhancedPlan(response.data);
    } catch (err) {
      console.error('Error enhancing plan:', err);
      setError(err.response?.data?.message || 'حدث خطأ أثناء تحسين الخطة');
    } finally {
      setIsEnhancing(false);
    }
  };

  return (
    <div className="my-3">
      <button
        onClick={enhancePlan}
        disabled={isEnhancing}
        className={`ios-button-primary flex items-center justify-center gap-2 w-full ${
          isEnhancing ? 'opacity-70' : ''
        }`}
      >
        {isEnhancing ? (
          <>
            <FaSpinner className="animate-spin" />
            <span>جاري تحسين الخطة...</span>
          </>
        ) : (
          <>
            <FaMagic className="text-yellow-300" />
            <span>تحسين الخطة بالذكاء الاصطناعي</span>
          </>
        )}
      </button>
      
      {error && (
        <div className="mt-1.5 text-[rgb(var(--ios-red))] text-xs text-center">
          {error}
        </div>
      )}
      
      <div className="mt-1.5 text-xs text-gray-500 text-center">
        يستخدم هذا الزر تقنية OpenAI لتحسين خطة السفر وإضافة تفاصيل أكثر فائدة
      </div>
    </div>
  );
};

export default EnhancePlanButton;
