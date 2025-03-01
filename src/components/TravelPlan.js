import { useState } from 'react';
import { FaBed, FaCalendarDay, FaMoneyBillWave, FaInfoCircle, FaPlane, FaLightbulb } from 'react-icons/fa';
import TravelPlanHeader from './TravelPlanHeader';
import DailyPlanSection from './DailyPlanSection';
import AccommodationSection from './AccommodationSection';
import BudgetSection from './BudgetSection';
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
    <div className="travel-plan mt-4">
      <TravelPlanHeader planData={plan} onBack={() => {}} />
      
      <div className="tabs">
        <button
          className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <FaInfoCircle className="ml-1" />
          نظرة عامة
        </button>
        <button
          className={`tab ${activeTab === 'daily' ? 'active' : ''}`}
          onClick={() => setActiveTab('daily')}
        >
          <FaCalendarDay className="ml-1" />
          الخطة اليومية
        </button>
        <button
          className={`tab ${activeTab === 'accommodations' ? 'active' : ''}`}
          onClick={() => setActiveTab('accommodations')}
        >
          <FaBed className="ml-1" />
          السكن
        </button>
        <button
          className={`tab ${activeTab === 'budget' ? 'active' : ''}`}
          onClick={() => setActiveTab('budget')}
        >
          <FaMoneyBillWave className="ml-1" />
          الميزانية
        </button>
        <button
          className={`tab ${activeTab === 'suggestions' ? 'active' : ''}`}
          onClick={() => setActiveTab('suggestions')}
        >
          <FaLightbulb className="ml-1" />
          اقتراحات
        </button>
      </div>
      
      <div className="card mb-4">
        <div className="card-body">
          {activeTab === 'overview' && (
            <div>
              <h3 className="heading-2 mb-4 text-primary">
                <FaInfoCircle className="ml-1" /> نظرة عامة
              </h3>
              <div className="whitespace-pre-wrap text-neutral-700">
                {plan.summary}
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
          
          {activeTab === 'daily' && (
            <div>
              <h3 className="heading-2 mb-4 text-primary">
                <FaCalendarDay className="ml-1" /> الخطة اليومية
              </h3>
              <DailyPlanSection dailyPlan={plan.dailyPlan} />
            </div>
          )}
          
          {activeTab === 'accommodations' && (
            <div>
              <h3 className="heading-2 mb-4 text-primary">
                <FaBed className="ml-1" /> خيارات السكن
              </h3>
              <AccommodationSection accommodation={plan.accommodation} />
            </div>
          )}
          
          {activeTab === 'budget' && (
            <div>
              <h3 className="heading-2 mb-4 text-primary">
                <FaMoneyBillWave className="ml-1" /> تفاصيل الميزانية
              </h3>
              <BudgetSection budget={plan.budgetBreakdown} />
            </div>
          )}
          
          {activeTab === 'suggestions' && (
            <div>
              <h3 className="heading-2 mb-4 text-primary">
                <FaLightbulb className="ml-1" /> اقتراحات خاصة
              </h3>
              <SuggestedActivities destination={plan.destination} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
