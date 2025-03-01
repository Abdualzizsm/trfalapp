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
          <FaInfoCircle className="text-[rgb(var(--ios-blue))] text-3xl mx-auto mb-3" />
          <h3 className="text-lg font-semibold mb-2">لم يتم العثور على خطة سفر</h3>
          <p className="text-gray-600 text-sm">يرجى إنشاء خطة سفر جديدة</p>
        </div>
      </div>
    );
  }

  // التحقق من وجود خطأ في الخطة
  if (plan.error) {
    return (
      <div className="ios-message ios-message-error">
        <div className="flex items-center">
          <FaInfoCircle className="text-red-500 ml-2" />
          <div>
            <h3 className="font-semibold">حدث خطأ</h3>
            <p className="text-sm">{plan.error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="ios-card">
      <TravelPlanHeader plan={plan} />
      
      {/* زر تحسين الخطة باستخدام OpenAI */}
      <EnhancePlanButton travelPlan={plan} onEnhancedPlan={onUpdatePlan} />
      
      <div className="border-b mb-4">
        <nav className="ios-tabs hide-scrollbar">
          <button
            onClick={() => setActiveTab('overview')}
            className={`ios-tab ${activeTab === 'overview' ? 'ios-tab-active' : ''}`}
          >
            نظرة عامة
          </button>
          <button
            onClick={() => setActiveTab('daily')}
            className={`ios-tab ${activeTab === 'daily' ? 'ios-tab-active' : ''}`}
          >
            الخطة اليومية
          </button>
          <button
            onClick={() => setActiveTab('accommodation')}
            className={`ios-tab ${activeTab === 'accommodation' ? 'ios-tab-active' : ''}`}
          >
            الإقامة
          </button>
          <button
            onClick={() => setActiveTab('budget')}
            className={`ios-tab ${activeTab === 'budget' ? 'ios-tab-active' : ''}`}
          >
            الميزانية
          </button>
          <button
            onClick={() => setActiveTab('suggestions')}
            className={`ios-tab ${activeTab === 'suggestions' ? 'ios-tab-active' : ''}`}
          >
            اقتراحات
          </button>
          <button
            onClick={() => setActiveTab('assistant')}
            className={`ios-tab ${activeTab === 'assistant' ? 'ios-tab-active' : ''}`}
          >
            المساعد
          </button>
        </nav>
      </div>
      
      {/* محتوى التبويبات */}
      <div className="mt-4">
        {/* نظرة عامة */}
        {activeTab === 'overview' && (
          <div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">نظرة عامة على الرحلة</h3>
              <p className="text-gray-600 text-sm">{plan.summary}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="ios-card p-3">
                <div className="flex items-center">
                  <FaCalendarDay className="text-[rgb(var(--ios-blue))] ml-2" />
                  <div>
                    <p className="text-xs text-gray-500">المدة</p>
                    <p className="font-semibold">{plan.duration} أيام</p>
                  </div>
                </div>
              </div>
              
              <div className="ios-card p-3">
                <div className="flex items-center">
                  <FaMoneyBillWave className="text-[rgb(var(--ios-blue))] ml-2" />
                  <div>
                    <p className="text-xs text-gray-500">الميزانية</p>
                    <p className="font-semibold">${plan.budget}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">أفضل الأوقات للزيارة</h3>
              <p className="text-gray-600 text-sm">{plan.bestTimeToVisit || 'غير محدد'}</p>
            </div>
            
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">نصائح مهمة</h3>
              <ul className="ios-list">
                {plan.tips && plan.tips.length > 0 ? (
                  plan.tips.map((tip, index) => (
                    <li key={index} className="ios-list-item text-sm">
                      <div className="flex">
                        <FaLightbulb className="text-yellow-500 ml-2 mt-1 flex-shrink-0" />
                        <span>{tip}</span>
                      </div>
                    </li>
                  ))
                ) : (
                  <li className="ios-list-item text-sm text-gray-500">لا توجد نصائح متاحة</li>
                )}
              </ul>
            </div>
          </div>
        )}
        
        {/* الخطة اليومية */}
        {activeTab === 'daily' && <DailyPlanSection dailyPlan={plan.dailyPlan} />}
        
        {/* الإقامة */}
        {activeTab === 'accommodation' && <AccommodationSection accommodation={plan.accommodation} />}
        
        {/* الميزانية */}
        {activeTab === 'budget' && <BudgetSection budget={plan.budgetBreakdown} />}
        
        {/* اقتراحات */}
        {activeTab === 'suggestions' && <SuggestedActivities destination={plan.destination} />}
        
        {/* المساعد */}
        {activeTab === 'assistant' && <TravelAssistant destination={plan.destination} />}
      </div>
    </div>
  );
}
