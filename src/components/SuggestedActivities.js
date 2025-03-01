import { useState, useEffect } from 'react';
import { FaLightbulb, FaSpinner, FaMapMarkerAlt, FaClock, FaMoneyBillWave, FaCalendarAlt, FaInfoCircle } from 'react-icons/fa';
import axios from 'axios';

/**
 * مكون عرض الأنشطة المقترحة
 * @param {Object} travelData - بيانات الرحلة
 */
const SuggestedActivities = ({ travelData }) => {
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeActivity, setActiveActivity] = useState(null);

  useEffect(() => {
    // إذا كانت بيانات الرحلة متوفرة، قم بالحصول على اقتراحات الأنشطة
    if (travelData && travelData.destination) {
      fetchSuggestedActivities();
    }
  }, [travelData]);

  const fetchSuggestedActivities = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post('/api/suggestActivities', travelData);
      setActivities(response.data.activities || []);
    } catch (err) {
      console.error('Error fetching suggested activities:', err);
      setError(err.response?.data?.message || 'حدث خطأ أثناء الحصول على اقتراحات الأنشطة');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="ios-card p-4">
        <div className="flex flex-col items-center justify-center">
          <FaSpinner className="text-2xl text-[rgb(var(--ios-blue))] animate-spin mb-3" />
          <h3 className="text-base font-semibold">جاري البحث عن أنشطة مميزة...</h3>
          <p className="text-sm text-gray-600 mt-1">نستخدم الذكاء الاصطناعي للعثور على أفضل الأنشطة في {travelData.destination}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="ios-card p-4">
        <div className="text-center">
          <FaInfoCircle className="text-2xl text-[rgb(var(--ios-red))] mb-3 mx-auto" />
          <h3 className="text-base font-semibold">لم نتمكن من الحصول على اقتراحات الأنشطة</h3>
          <p className="text-sm text-gray-600 mt-1">{error}</p>
          <button 
            onClick={fetchSuggestedActivities}
            className="ios-button mt-3"
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  if (activities.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="ios-card-header">
        <FaLightbulb className="text-yellow-500 ml-2" />
        <h2 className="text-lg font-semibold">أنشطة مقترحة في {travelData.destination}</h2>
      </div>
      
      <div className="ios-scrollview-x hide-scrollbar mb-3">
        <div className="flex gap-3 py-1">
          {activities.map((activity, index) => (
            <div 
              key={index}
              className={`ios-card-compact p-3 min-w-[240px] cursor-pointer ${
                activeActivity === index 
                  ? 'ios-card-selected' 
                  : ''
              }`}
              onClick={() => setActiveActivity(activeActivity === index ? null : index)}
            >
              <h3 className="text-base font-semibold mb-2">{activity.name}</h3>
              <div className="space-y-1">
                <div className="flex items-center text-xs text-gray-600">
                  <FaMapMarkerAlt className="text-[rgb(var(--ios-red))] ml-1.5 flex-shrink-0" />
                  <span>{activity.location}</span>
                </div>
                <div className="flex items-center text-xs text-gray-600">
                  <FaClock className="text-[rgb(var(--ios-blue))] ml-1.5 flex-shrink-0" />
                  <span>{activity.duration}</span>
                </div>
                <div className="flex items-center text-xs text-gray-600">
                  <FaMoneyBillWave className="text-[rgb(var(--ios-green))] ml-1.5 flex-shrink-0" />
                  <span>{activity.cost}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {activeActivity !== null && (
        <div className="ios-card p-4">
          <h3 className="text-base font-semibold mb-2">{activities[activeActivity].name}</h3>
          <p className="text-sm text-gray-700 mb-3">{activities[activeActivity].description}</p>
          
          <div className="space-y-3">
            <div className="flex items-start">
              <FaCalendarAlt className="text-[rgb(var(--ios-purple))] mt-0.5 ml-2 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-medium">أفضل وقت للزيارة</h4>
                <p className="text-xs text-gray-600">{activities[activeActivity].bestTime}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <FaInfoCircle className="text-[rgb(var(--ios-blue))] mt-0.5 ml-2 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-medium">نصائح مفيدة</h4>
                <p className="text-xs text-gray-600">{activities[activeActivity].tips}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="text-center">
        <button 
          onClick={fetchSuggestedActivities}
          className="ios-button"
        >
          اقتراح المزيد من الأنشطة
        </button>
      </div>
    </div>
  );
};

export default SuggestedActivities;
