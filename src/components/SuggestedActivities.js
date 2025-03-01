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
      <div className="my-8 p-6 bg-white rounded-xl shadow-lg">
        <div className="flex flex-col items-center justify-center">
          <FaSpinner className="text-3xl text-blue-500 animate-spin mb-4" />
          <h3 className="text-xl font-semibold text-gray-800">جاري البحث عن أنشطة مميزة...</h3>
          <p className="text-gray-600 mt-2">نستخدم الذكاء الاصطناعي للعثور على أفضل الأنشطة في {travelData.destination}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="my-8 p-6 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <FaInfoCircle className="text-3xl text-red-500 mb-4 mx-auto" />
          <h3 className="text-xl font-semibold text-gray-800">لم نتمكن من الحصول على اقتراحات الأنشطة</h3>
          <p className="text-gray-600 mt-2">{error}</p>
          <button 
            onClick={fetchSuggestedActivities}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
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
    <div className="my-8 p-6 bg-white rounded-xl shadow-lg">
      <div className="flex items-center mb-6">
        <FaLightbulb className="text-2xl text-yellow-500 mr-3" />
        <h2 className="text-2xl font-bold text-gray-800">أنشطة مقترحة في {travelData.destination}</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {activities.map((activity, index) => (
          <div 
            key={index}
            className={`p-4 rounded-lg cursor-pointer transition-all duration-300 transform hover:scale-105 ${
              activeActivity === index 
                ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 shadow-md' 
                : 'bg-gray-50 hover:bg-blue-50 border border-gray-200'
            }`}
            onClick={() => setActiveActivity(activeActivity === index ? null : index)}
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{activity.name}</h3>
            <div className="flex items-center text-gray-600 mb-1">
              <FaMapMarkerAlt className="text-red-500 mr-2" />
              <span>{activity.location}</span>
            </div>
            <div className="flex items-center text-gray-600 mb-1">
              <FaClock className="text-blue-500 mr-2" />
              <span>{activity.duration}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <FaMoneyBillWave className="text-green-500 mr-2" />
              <span>{activity.cost}</span>
            </div>
          </div>
        ))}
      </div>
      
      {activeActivity !== null && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-5 rounded-lg border border-blue-200 mb-4">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">{activities[activeActivity].name}</h3>
          <p className="text-gray-700 mb-4">{activities[activeActivity].description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start">
              <FaCalendarAlt className="text-purple-500 mt-1 mr-2" />
              <div>
                <h4 className="font-medium text-gray-800">أفضل وقت للزيارة</h4>
                <p className="text-gray-600">{activities[activeActivity].bestTime}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <FaInfoCircle className="text-blue-500 mt-1 mr-2" />
              <div>
                <h4 className="font-medium text-gray-800">نصائح مفيدة</h4>
                <p className="text-gray-600">{activities[activeActivity].tips}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="text-center mt-4">
        <button 
          onClick={fetchSuggestedActivities}
          className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-colors shadow-md"
        >
          اقتراح المزيد من الأنشطة
        </button>
      </div>
    </div>
  );
};

export default SuggestedActivities;
