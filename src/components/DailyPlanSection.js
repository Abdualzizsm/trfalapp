import { useState } from 'react';
import { FaCalendarDay, FaSun, FaMoon, FaUtensils } from 'react-icons/fa';

export default function DailyPlanSection({ dailyPlan }) {
  const [activeDay, setActiveDay] = useState(0);

  if (!dailyPlan || dailyPlan.length === 0) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
        <p className="text-gray-500 text-center">لا توجد خطة يومية</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex overflow-x-auto pb-2 mb-4 hide-scrollbar">
        <div className="flex space-x-2 space-x-reverse">
          {dailyPlan.map((day, index) => (
            <button
              key={index}
              onClick={() => setActiveDay(index)}
              className={`px-4 py-2 rounded-full whitespace-nowrap ${
                activeDay === index
                  ? 'bg-ios-blue text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              اليوم {day.day}
            </button>
          ))}
        </div>
      </div>

      {dailyPlan[activeDay] && (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="bg-ios-blue text-white p-4">
            <h3 className="font-bold text-lg">{dailyPlan[activeDay].title}</h3>
            <p className="mt-1">{dailyPlan[activeDay].description}</p>
          </div>

          <div className="p-4">
            {/* الصباح */}
            <div className="mb-4">
              <h4 className="font-bold flex items-center text-ios-blue">
                <FaSun className="ml-1" />
                الصباح
              </h4>
              <div className="mt-2 bg-ios-light-gray p-3 rounded-lg">
                <div className="font-semibold">{dailyPlan[activeDay].morning.activity}</div>
                <div className="text-gray-600 mt-1">
                  <span className="font-medium">الموقع:</span> {dailyPlan[activeDay].morning.location}
                </div>
                <div className="text-gray-600 mt-1">{dailyPlan[activeDay].morning.description}</div>
                <div className="text-ios-green mt-1">
                  <span className="font-medium">التكلفة:</span> {dailyPlan[activeDay].morning.cost}
                </div>
              </div>
            </div>

            {/* الظهر */}
            <div className="mb-4">
              <h4 className="font-bold flex items-center text-ios-blue">
                <FaSun className="ml-1" />
                الظهيرة
              </h4>
              <div className="mt-2 bg-ios-light-gray p-3 rounded-lg">
                <div className="font-semibold">{dailyPlan[activeDay].afternoon.activity}</div>
                <div className="text-gray-600 mt-1">
                  <span className="font-medium">الموقع:</span> {dailyPlan[activeDay].afternoon.location}
                </div>
                <div className="text-gray-600 mt-1">{dailyPlan[activeDay].afternoon.description}</div>
                <div className="text-ios-green mt-1">
                  <span className="font-medium">التكلفة:</span> {dailyPlan[activeDay].afternoon.cost}
                </div>
              </div>
            </div>

            {/* المساء */}
            <div className="mb-4">
              <h4 className="font-bold flex items-center text-ios-blue">
                <FaMoon className="ml-1" />
                المساء
              </h4>
              <div className="mt-2 bg-ios-light-gray p-3 rounded-lg">
                <div className="font-semibold">{dailyPlan[activeDay].evening.activity}</div>
                <div className="text-gray-600 mt-1">
                  <span className="font-medium">الموقع:</span> {dailyPlan[activeDay].evening.location}
                </div>
                <div className="text-gray-600 mt-1">{dailyPlan[activeDay].evening.description}</div>
                <div className="text-ios-green mt-1">
                  <span className="font-medium">التكلفة:</span> {dailyPlan[activeDay].evening.cost}
                </div>
              </div>
            </div>

            {/* الوجبات */}
            <div>
              <h4 className="font-bold flex items-center text-ios-blue">
                <FaUtensils className="ml-1" />
                الوجبات
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
                <div className="bg-ios-light-gray p-3 rounded-lg">
                  <div className="font-semibold">الإفطار</div>
                  <div className="text-gray-600 mt-1">{dailyPlan[activeDay].meals.breakfast.recommendation}</div>
                  <div className="text-ios-green mt-1">{dailyPlan[activeDay].meals.breakfast.cost}</div>
                </div>
                <div className="bg-ios-light-gray p-3 rounded-lg">
                  <div className="font-semibold">الغداء</div>
                  <div className="text-gray-600 mt-1">{dailyPlan[activeDay].meals.lunch.recommendation}</div>
                  <div className="text-ios-green mt-1">{dailyPlan[activeDay].meals.lunch.cost}</div>
                </div>
                <div className="bg-ios-light-gray p-3 rounded-lg">
                  <div className="font-semibold">العشاء</div>
                  <div className="text-gray-600 mt-1">{dailyPlan[activeDay].meals.dinner.recommendation}</div>
                  <div className="text-ios-green mt-1">{dailyPlan[activeDay].meals.dinner.cost}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
