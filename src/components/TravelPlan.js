import { useState } from 'react';
import { FaBed, FaCalendarDay, FaMoneyBillWave, FaInfoCircle, FaPlane, FaLightbulb } from 'react-icons/fa';
import TravelPlanHeader from './TravelPlanHeader';
import AccommodationSection from './AccommodationSection';
import DailyPlanSection from './DailyPlanSection';
import BudgetSection from './BudgetSection';
import EnhancePlanButton from './EnhancePlanButton';
import SuggestedActivities from './SuggestedActivities';
import TravelAssistant from './TravelAssistant';

export default function TravelPlan({ plan, travelData, onUpdatePlan }) {
  const [activeTab, setActiveTab] = useState('overview');

  // التحقق من وجود خطة سفر صالحة
  if (!plan) {
    return (
      <div className="ios-card">
        <div className="p-4 text-center">
          <FaInfoCircle className="text-ios-blue text-4xl mx-auto mb-3" />
          <h3 className="text-xl font-bold mb-2">لم يتم العثور على خطة سفر</h3>
          <p className="text-gray-600">يرجى إنشاء خطة سفر جديدة</p>
        </div>
      </div>
    );
  }

  // التحقق من وجود خطأ في الخطة
  if (plan.error) {
    return (
      <div className="ios-card bg-red-50">
        <div className="p-4 text-center">
          <FaInfoCircle className="text-ios-red text-4xl mx-auto mb-3" />
          <h3 className="text-xl font-bold mb-2">حدث خطأ أثناء إنشاء خطة السفر</h3>
          <p className="text-gray-600">{plan.error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="ios-card">
      <TravelPlanHeader plan={plan} />
      
      {/* زر تحسين الخطة باستخدام OpenAI */}
      <EnhancePlanButton travelPlan={plan} onEnhancedPlan={onUpdatePlan} />
      
      <div className="border-b mb-6">
        <nav className="flex overflow-x-auto hide-scrollbar">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'overview'
                ? 'border-ios-blue text-ios-blue'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <FaInfoCircle className="ml-1 inline-block" />
            نظرة عامة
          </button>
          <button
            onClick={() => setActiveTab('daily')}
            className={`px-4 py-2 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'daily'
                ? 'border-ios-blue text-ios-blue'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <FaCalendarDay className="ml-1 inline-block" />
            الخطة اليومية
          </button>
          <button
            onClick={() => setActiveTab('accommodation')}
            className={`px-4 py-2 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'accommodation'
                ? 'border-ios-blue text-ios-blue'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <FaBed className="ml-1 inline-block" />
            الإقامة
          </button>
          <button
            onClick={() => setActiveTab('transportation')}
            className={`px-4 py-2 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'transportation'
                ? 'border-ios-blue text-ios-blue'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <FaPlane className="ml-1 inline-block" />
            النقل
          </button>
          <button
            onClick={() => setActiveTab('budget')}
            className={`px-4 py-2 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'budget'
                ? 'border-ios-blue text-ios-blue'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <FaMoneyBillWave className="ml-1 inline-block" />
            الميزانية
          </button>
          <button
            onClick={() => setActiveTab('suggestions')}
            className={`px-4 py-2 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'suggestions'
                ? 'border-ios-blue text-ios-blue'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <FaLightbulb className="ml-1 inline-block" />
            اقتراحات
          </button>
        </nav>
      </div>

      <div className="mb-6">
        {activeTab === 'overview' && (
          <div>
            {plan.overview?.travelTips && plan.overview.travelTips.length > 0 && (
              <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
                <h3 className="font-bold text-lg mb-2">نصائح السفر</h3>
                <ul className="list-disc list-inside space-y-1">
                  {plan.overview.travelTips.map((tip, index) => (
                    <li key={index} className="text-gray-700">{tip}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {plan.overview?.safetyInfo && (
              <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
                <h3 className="font-bold text-lg mb-2">معلومات الأمان</h3>
                <p className="text-gray-700">{plan.overview.safetyInfo}</p>
              </div>
            )}
            
            {plan.overview?.localCustoms && (
              <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
                <h3 className="font-bold text-lg mb-2">العادات المحلية</h3>
                <p className="text-gray-700">{plan.overview.localCustoms}</p>
              </div>
            )}
            
            {plan.overview?.packingList && plan.overview.packingList.length > 0 && (
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-bold text-lg mb-2">قائمة التعبئة</h3>
                <ul className="list-disc list-inside space-y-1">
                  {plan.overview.packingList.map((item, index) => (
                    <li key={index} className="text-gray-700">{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {activeTab === 'daily' && (
          <DailyPlanSection dailyPlan={plan.dailyPlan} />
        )}

        {activeTab === 'accommodation' && (
          <AccommodationSection accommodations={plan.accommodations} />
        )}

        {activeTab === 'transportation' && (
          <div className="space-y-4">
            {plan.transportation?.options && plan.transportation.options.length > 0 ? (
              plan.transportation.options.map((option, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-lg">{option.type}</h3>
                    <span className="bg-ios-light-blue text-ios-blue px-2 py-1 rounded-full text-sm">
                      {option.recommendedFor}
                    </span>
                  </div>
                  <p className="mt-2 text-gray-700">{option.description}</p>
                  <div className="mt-2 text-ios-green">{option.cost}</div>
                  {option.tips && (
                    <div className="mt-2 text-gray-600">
                      <span className="font-medium">نصائح:</span> {option.tips}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-gray-500 text-center">لا توجد معلومات عن وسائل النقل</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'budget' && (
          <BudgetSection budget={plan.budget} />
        )}
        
        {activeTab === 'suggestions' && (
          <SuggestedActivities travelData={travelData} />
        )}
      </div>
      
      {/* مساعد السفر الذكي */}
      <TravelAssistant travelPlan={plan} />
    </div>
  );
}
