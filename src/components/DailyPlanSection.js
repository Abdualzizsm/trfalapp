import { useState } from 'react';
import { FaCalendarDay, FaSun, FaMoon, FaUtensils, FaMapMarkerAlt, FaInfoCircle, FaMoneyBillWave, FaWalking, FaRegClock, FaChevronRight, FaChevronLeft } from 'react-icons/fa';

export default function DailyPlanSection({ dailyPlan }) {
  const [activeDay, setActiveDay] = useState(0);

  if (!dailyPlan || dailyPlan.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm mb-4 text-center">
        <FaInfoCircle className="text-ios-blue text-4xl mx-auto mb-3" />
        <p className="text-gray-500 text-lg">لا توجد خطة يومية متاحة</p>
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
      {/* عنوان القسم */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold text-gray-800 flex items-center">
          <FaCalendarDay className="ml-2 text-ios-blue" />
          الخطة اليومية
        </h2>
        <div className="flex items-center space-x-2 space-x-reverse">
          <button 
            onClick={goToPreviousDay} 
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
            aria-label="اليوم السابق"
          >
            <FaChevronRight className="text-gray-600" />
          </button>
          <span className="text-gray-600 font-medium">
            يوم {activeDay + 1} من {dailyPlan.length}
          </span>
          <button 
            onClick={goToNextDay} 
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
            aria-label="اليوم التالي"
          >
            <FaChevronLeft className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* أزرار الأيام */}
      <div className="flex overflow-x-auto pb-2 mb-5 hide-scrollbar">
        <div className="flex space-x-2 space-x-reverse">
          {dailyPlan.map((day, index) => (
            <button
              key={index}
              onClick={() => setActiveDay(index)}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-all duration-200 ${
                activeDay === index
                  ? 'bg-ios-blue text-white shadow-md transform scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <span className="font-bold">اليوم {day.day}</span>
              {day.title && <span className="mr-1 text-xs opacity-80"> - {day.title.split(' ')[0]}</span>}
            </button>
          ))}
        </div>
      </div>

      {dailyPlan[activeDay] && (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow duration-300">
          {/* عنوان اليوم */}
          <div className="bg-gradient-to-l from-blue-600 to-blue-500 text-white p-5">
            <h3 className="font-bold text-xl mb-1 flex items-center">
              <FaCalendarDay className="ml-2" />
              {dailyPlan[activeDay].title}
            </h3>
            <p className="mt-1 text-blue-100">{dailyPlan[activeDay].description}</p>
          </div>

          <div className="p-5">
            {/* الصباح */}
            <div className="mb-6 transform transition-transform duration-300 hover:scale-[1.01]">
              <h4 className="font-bold flex items-center text-ios-blue text-lg mb-3">
                <FaSun className="ml-2 text-yellow-500" />
                الصباح
              </h4>
              <div className="mt-2 bg-blue-50 p-4 rounded-lg border-r-4 border-yellow-400">
                <div className="font-semibold text-lg mb-2">{dailyPlan[activeDay].morning.activity}</div>
                <div className="flex items-start mb-2">
                  <FaMapMarkerAlt className="text-red-500 mt-1 ml-2 flex-shrink-0" />
                  <div className="text-gray-700">
                    <span className="font-medium">الموقع:</span> {dailyPlan[activeDay].morning.location}
                  </div>
                </div>
                <div className="flex items-start mb-2">
                  <FaInfoCircle className="text-blue-500 mt-1 ml-2 flex-shrink-0" />
                  <div className="text-gray-700">{dailyPlan[activeDay].morning.description}</div>
                </div>
                <div className="flex items-start">
                  <FaMoneyBillWave className="text-green-500 mt-1 ml-2 flex-shrink-0" />
                  <div className="text-green-600">
                    <span className="font-medium">التكلفة:</span> {dailyPlan[activeDay].morning.cost}
                  </div>
                </div>
              </div>
            </div>

            {/* الظهر */}
            <div className="mb-6 transform transition-transform duration-300 hover:scale-[1.01]">
              <h4 className="font-bold flex items-center text-ios-blue text-lg mb-3">
                <FaRegClock className="ml-2 text-orange-500" />
                الظهيرة
              </h4>
              <div className="mt-2 bg-orange-50 p-4 rounded-lg border-r-4 border-orange-400">
                <div className="font-semibold text-lg mb-2">{dailyPlan[activeDay].afternoon.activity}</div>
                <div className="flex items-start mb-2">
                  <FaMapMarkerAlt className="text-red-500 mt-1 ml-2 flex-shrink-0" />
                  <div className="text-gray-700">
                    <span className="font-medium">الموقع:</span> {dailyPlan[activeDay].afternoon.location}
                  </div>
                </div>
                <div className="flex items-start mb-2">
                  <FaInfoCircle className="text-blue-500 mt-1 ml-2 flex-shrink-0" />
                  <div className="text-gray-700">{dailyPlan[activeDay].afternoon.description}</div>
                </div>
                <div className="flex items-start">
                  <FaMoneyBillWave className="text-green-500 mt-1 ml-2 flex-shrink-0" />
                  <div className="text-green-600">
                    <span className="font-medium">التكلفة:</span> {dailyPlan[activeDay].afternoon.cost}
                  </div>
                </div>
              </div>
            </div>

            {/* المساء */}
            <div className="mb-6 transform transition-transform duration-300 hover:scale-[1.01]">
              <h4 className="font-bold flex items-center text-ios-blue text-lg mb-3">
                <FaMoon className="ml-2 text-indigo-500" />
                المساء
              </h4>
              <div className="mt-2 bg-indigo-50 p-4 rounded-lg border-r-4 border-indigo-400">
                <div className="font-semibold text-lg mb-2">{dailyPlan[activeDay].evening.activity}</div>
                <div className="flex items-start mb-2">
                  <FaMapMarkerAlt className="text-red-500 mt-1 ml-2 flex-shrink-0" />
                  <div className="text-gray-700">
                    <span className="font-medium">الموقع:</span> {dailyPlan[activeDay].evening.location}
                  </div>
                </div>
                <div className="flex items-start mb-2">
                  <FaInfoCircle className="text-blue-500 mt-1 ml-2 flex-shrink-0" />
                  <div className="text-gray-700">{dailyPlan[activeDay].evening.description}</div>
                </div>
                <div className="flex items-start">
                  <FaMoneyBillWave className="text-green-500 mt-1 ml-2 flex-shrink-0" />
                  <div className="text-green-600">
                    <span className="font-medium">التكلفة:</span> {dailyPlan[activeDay].evening.cost}
                  </div>
                </div>
              </div>
            </div>

            {/* الوجبات */}
            <div className="transform transition-transform duration-300 hover:scale-[1.01]">
              <h4 className="font-bold flex items-center text-ios-blue text-lg mb-3">
                <FaUtensils className="ml-2 text-red-500" />
                الوجبات
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                <div className="bg-red-50 p-4 rounded-lg border border-red-100 hover:shadow-sm transition-shadow duration-200">
                  <div className="font-semibold text-lg mb-2 text-red-700">الإفطار</div>
                  <div className="text-gray-700 mb-2">{dailyPlan[activeDay].meals.breakfast.recommendation}</div>
                  <div className="text-green-600 font-medium">{dailyPlan[activeDay].meals.breakfast.cost}</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border border-green-100 hover:shadow-sm transition-shadow duration-200">
                  <div className="font-semibold text-lg mb-2 text-green-700">الغداء</div>
                  <div className="text-gray-700 mb-2">{dailyPlan[activeDay].meals.lunch.recommendation}</div>
                  <div className="text-green-600 font-medium">{dailyPlan[activeDay].meals.lunch.cost}</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-100 hover:shadow-sm transition-shadow duration-200">
                  <div className="font-semibold text-lg mb-2 text-purple-700">العشاء</div>
                  <div className="text-gray-700 mb-2">{dailyPlan[activeDay].meals.dinner.recommendation}</div>
                  <div className="text-green-600 font-medium">{dailyPlan[activeDay].meals.dinner.cost}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
