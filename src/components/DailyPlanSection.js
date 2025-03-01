import { useState } from 'react';
import { FaCalendarDay, FaSun, FaMoon, FaUtensils, FaMapMarkerAlt, FaInfoCircle, FaMoneyBillWave, FaRegClock, FaChevronRight, FaChevronLeft } from 'react-icons/fa';

export default function DailyPlanSection({ dailyPlan }) {
  const [activeDay, setActiveDay] = useState(0);

  if (!dailyPlan || dailyPlan.length === 0) {
    return (
      <div className="ios-message">
        <FaInfoCircle className="text-[rgb(var(--ios-blue))] text-2xl mx-auto mb-2" />
        <p className="text-gray-500 text-sm">لا توجد خطة يومية متاحة</p>
      </div>
    );
  }

  const goToPreviousDay = () => {
    setActiveDay((prev) => (prev > 0 ? prev - 1 : dailyPlan.length - 1));
  };

  const goToNextDay = () => {
    setActiveDay((prev) => (prev < dailyPlan.length - 1 ? prev + 1 : 0));
  };

  return (
    <div>
      {/* التنقل بين الأيام */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium">
          يوم {activeDay + 1} من {dailyPlan.length}
        </span>
        <div className="flex gap-2">
          <button 
            onClick={goToPreviousDay} 
            className="ios-button-icon"
            aria-label="اليوم السابق"
          >
            <FaChevronRight />
          </button>
          <button 
            onClick={goToNextDay} 
            className="ios-button-icon"
            aria-label="اليوم التالي"
          >
            <FaChevronLeft />
          </button>
        </div>
      </div>

      {/* أزرار الأيام */}
      <div className="flex overflow-x-auto hide-scrollbar mb-4">
        <div className="flex gap-2">
          {dailyPlan.map((day, index) => (
            <button
              key={index}
              onClick={() => setActiveDay(index)}
              className={`ios-pill ${activeDay === index ? 'ios-pill-active' : ''}`}
            >
              <span>اليوم {day.day}</span>
              {day.title && <span className="mr-1 text-xs opacity-80"> - {day.title.split(' ')[0]}</span>}
            </button>
          ))}
        </div>
      </div>

      {dailyPlan[activeDay] && (
        <div className="ios-card">
          {/* عنوان اليوم */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-1 flex items-center">
              <FaCalendarDay className="ml-2 text-[rgb(var(--ios-blue))]" />
              {dailyPlan[activeDay].title}
            </h3>
            <p className="text-sm text-gray-600">{dailyPlan[activeDay].description}</p>
          </div>

          {/* الصباح */}
          <div className="mb-4">
            <h4 className="text-base font-semibold flex items-center mb-2">
              <FaSun className="ml-2 text-yellow-500" />
              الصباح
            </h4>
            <div className="ios-card p-3">
              <div className="font-medium mb-1">{dailyPlan[activeDay].morning.activity}</div>
              <div className="flex items-start mb-1 text-xs text-gray-600">
                <FaMapMarkerAlt className="text-[rgb(var(--ios-red))] mt-0.5 ml-1 flex-shrink-0" />
                <div>{dailyPlan[activeDay].morning.location}</div>
              </div>
              <div className="text-xs text-gray-600 mb-1">{dailyPlan[activeDay].morning.description}</div>
              <div className="flex items-center text-xs text-[rgb(var(--ios-green))]">
                <FaMoneyBillWave className="ml-1" />
                <div>{dailyPlan[activeDay].morning.cost}</div>
              </div>
            </div>
          </div>

          {/* الظهر */}
          <div className="mb-4">
            <h4 className="text-base font-semibold flex items-center mb-2">
              <FaRegClock className="ml-2 text-orange-500" />
              الظهيرة
            </h4>
            <div className="ios-card p-3">
              <div className="font-medium mb-1">{dailyPlan[activeDay].afternoon.activity}</div>
              <div className="flex items-start mb-1 text-xs text-gray-600">
                <FaMapMarkerAlt className="text-[rgb(var(--ios-red))] mt-0.5 ml-1 flex-shrink-0" />
                <div>{dailyPlan[activeDay].afternoon.location}</div>
              </div>
              <div className="text-xs text-gray-600 mb-1">{dailyPlan[activeDay].afternoon.description}</div>
              <div className="flex items-center text-xs text-[rgb(var(--ios-green))]">
                <FaMoneyBillWave className="ml-1" />
                <div>{dailyPlan[activeDay].afternoon.cost}</div>
              </div>
            </div>
          </div>

          {/* المساء */}
          <div className="mb-4">
            <h4 className="text-base font-semibold flex items-center mb-2">
              <FaMoon className="ml-2 text-indigo-500" />
              المساء
            </h4>
            <div className="ios-card p-3">
              <div className="font-medium mb-1">{dailyPlan[activeDay].evening.activity}</div>
              <div className="flex items-start mb-1 text-xs text-gray-600">
                <FaMapMarkerAlt className="text-[rgb(var(--ios-red))] mt-0.5 ml-1 flex-shrink-0" />
                <div>{dailyPlan[activeDay].evening.location}</div>
              </div>
              <div className="text-xs text-gray-600 mb-1">{dailyPlan[activeDay].evening.description}</div>
              <div className="flex items-center text-xs text-[rgb(var(--ios-green))]">
                <FaMoneyBillWave className="ml-1" />
                <div>{dailyPlan[activeDay].evening.cost}</div>
              </div>
            </div>
          </div>

          {/* الوجبات */}
          <div>
            <h4 className="text-base font-semibold flex items-center mb-2">
              <FaUtensils className="ml-2 text-[rgb(var(--ios-red))]" />
              الوجبات
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="ios-card p-3">
                <div className="font-medium mb-1 text-sm">الإفطار</div>
                <div className="text-xs text-gray-600 mb-1">{dailyPlan[activeDay].meals.breakfast.recommendation}</div>
                <div className="text-xs text-[rgb(var(--ios-green))]">{dailyPlan[activeDay].meals.breakfast.cost}</div>
              </div>
              <div className="ios-card p-3">
                <div className="font-medium mb-1 text-sm">الغداء</div>
                <div className="text-xs text-gray-600 mb-1">{dailyPlan[activeDay].meals.lunch.recommendation}</div>
                <div className="text-xs text-[rgb(var(--ios-green))]">{dailyPlan[activeDay].meals.lunch.cost}</div>
              </div>
              <div className="ios-card p-3">
                <div className="font-medium mb-1 text-sm">العشاء</div>
                <div className="text-xs text-gray-600 mb-1">{dailyPlan[activeDay].meals.dinner.recommendation}</div>
                <div className="text-xs text-[rgb(var(--ios-green))]">{dailyPlan[activeDay].meals.dinner.cost}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
