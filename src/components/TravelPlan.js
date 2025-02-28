import React, { useState, useEffect } from 'react';
import { 
  FaMapMarkedAlt, FaBed, FaCalendarDay, FaTags, FaLightbulb, 
  FaShare, FaDownload, FaSave, FaSun, FaMoon, FaUtensils, 
  FaMapMarkerAlt, FaMoneyBillWave, FaCalendarAlt, FaLanguage,
  FaCloudSun, FaCheck, FaCode
} from 'react-icons/fa';
import { EmailShareButton, WhatsappShareButton, TwitterShareButton, FacebookShareButton, EmailIcon, WhatsappIcon, TwitterIcon, FacebookIcon } from 'react-share';
import { getDefaultImage } from '../utils/imageService';
import ImageGallery from './ImageGallery';

export default function TravelPlan({ plan, travelData }) {
  const [activeTab, setActiveTab] = useState('summary');
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [savedPlans, setSavedPlans] = useState([]);
  const [isSaved, setIsSaved] = useState(false);
  const [destinationImage, setDestinationImage] = useState('');
  const [showGallery, setShowGallery] = useState(false);
  
  // تحميل صورة الوجهة عند تحميل المكون
  useEffect(() => {
    if (travelData && travelData.destination) {
      // استخدام الصورة الافتراضية
      const image = getDefaultImage(travelData.destination);
      setDestinationImage(image);
    }
  }, [travelData]);
  
  // التحقق مما إذا كانت الخطة محفوظة عند تحميل المكون
  useEffect(() => {
    const loadSavedPlans = () => {
      try {
        const saved = localStorage.getItem('savedTravelPlans');
        if (saved) {
          const parsedPlans = JSON.parse(saved);
          setSavedPlans(parsedPlans);
          
          // التحقق مما إذا كانت الخطة الحالية محفوظة
          const isPlanSaved = parsedPlans.some(
            savedPlan => 
              savedPlan.destination === travelData.destination && 
              savedPlan.startDate === travelData.startDate
          );
          setIsSaved(isPlanSaved);
        }
      } catch (error) {
        console.error('Error loading saved plans:', error);
      }
    };
    
    loadSavedPlans();
  }, [travelData]);
  
  // وظيفة لحفظ الخطة
  const handleSavePlan = () => {
    try {
      const planToSave = {
        id: Date.now(),
        destination: travelData.destination,
        startDate: travelData.startDate,
        endDate: travelData.endDate,
        travelers: travelData.travelers,
        plan: plan,
        savedAt: new Date().toISOString()
      };
      
      const updatedPlans = [...savedPlans, planToSave];
      localStorage.setItem('savedTravelPlans', JSON.stringify(updatedPlans));
      setSavedPlans(updatedPlans);
      setIsSaved(true);
      
      alert('تم حفظ خطة السفر بنجاح!');
    } catch (error) {
      console.error('Error saving plan:', error);
      alert('حدث خطأ أثناء حفظ الخطة');
    }
  };
  
  // وظيفة لإلغاء حفظ الخطة
  const handleRemoveSavedPlan = () => {
    try {
      const updatedPlans = savedPlans.filter(
        savedPlan => 
          !(savedPlan.destination === travelData.destination && 
            savedPlan.startDate === travelData.startDate)
      );
      
      localStorage.setItem('savedTravelPlans', JSON.stringify(updatedPlans));
      setSavedPlans(updatedPlans);
      setIsSaved(false);
      
      alert('تم إلغاء حفظ خطة السفر');
    } catch (error) {
      console.error('Error removing saved plan:', error);
      alert('حدث خطأ أثناء إلغاء حفظ الخطة');
    }
  };
  
  // وظيفة لتنزيل الخطة كملف نصي
  const handleDownloadPlan = () => {
    try {
      const planText = `خطة السفر إلى ${travelData.destination}\n\n${JSON.stringify(plan, null, 2)}`;
      const blob = new Blob([planText], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = `خطة_سفر_${travelData.destination}.txt`;
      document.body.appendChild(a);
      a.click();
      
      // تنظيف
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 100);
    } catch (error) {
      console.error('Error downloading plan:', error);
      alert('حدث خطأ أثناء تنزيل الخطة');
    }
  };
  
  // عرض محتوى الخطة
  const renderPlanContent = () => {
    if (!plan) return <p>لا توجد خطة سفر لعرضها.</p>;
    
    // في حالة وجود نص خام (ليس JSON)
    if (typeof plan === 'string') {
      return <div className="travel-plan-content">{plan}</div>;
    }
    
    // عرض المحتوى حسب التبويب النشط
    switch (activeTab) {
      case 'summary':
        return (
          <div className="space-y-6">
            {plan.overview && (
              <>
                <div className="ios-card">
                  <h2 className="text-2xl font-bold text-ios-blue mb-4">{plan.overview.title || `رحلة إلى ${travelData.destination}`}</h2>
                  <p className="text-gray-700 mb-4">{plan.overview.description}</p>
                  
                  {plan.overview.highlights && plan.overview.highlights.length > 0 && (
                    <div className="mt-4">
                      <h3 className="text-lg font-bold mb-2">أبرز المميزات:</h3>
                      <ul className="list-disc list-inside space-y-1">
                        {plan.overview.highlights.map((highlight, index) => (
                          <li key={index} className="text-gray-700">{highlight}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                
                <div className="ios-card grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center">
                    <FaCalendarAlt className="text-ios-blue ml-2" />
                    <div>
                      <h4 className="font-bold">أفضل وقت للزيارة</h4>
                      <p>{plan.overview.bestTimeToVisit}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <FaLanguage className="text-ios-blue ml-2" />
                    <div>
                      <h4 className="font-bold">اللغة</h4>
                      <p>{plan.overview.language}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <FaMoneyBillWave className="text-ios-blue ml-2" />
                    <div>
                      <h4 className="font-bold">العملة</h4>
                      <p>{plan.overview.currency}</p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        );
        
      case 'accommodation':
        return (
          <div className="space-y-6">
            {plan.accommodation && plan.accommodation.recommendations && (
              plan.accommodation.recommendations.map((hotel, index) => (
                <div key={index} className="ios-card">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-ios-blue">{hotel.name}</h3>
                    <span className="bg-ios-light-gray text-gray-700 px-3 py-1 rounded-full text-sm">
                      {hotel.priceRange}
                    </span>
                  </div>
                  
                  <div className="mb-3">
                    <span className="bg-ios-blue text-white px-3 py-1 rounded-full text-sm">
                      {hotel.type}
                    </span>
                    <span className="mr-2 text-gray-600">
                      <FaMapMarkerAlt className="inline ml-1" />
                      {hotel.location}
                    </span>
                  </div>
                  
                  <p className="text-gray-700 mb-4">{hotel.description}</p>
                  
                  {hotel.features && hotel.features.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {hotel.features.map((feature, idx) => (
                        <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-sm">
                          <FaCheck className="inline ml-1 text-green-500" size={12} />
                          {feature}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        );
        
      case 'itinerary':
        return (
          <div className="space-y-6">
            {plan.dailyPlan && plan.dailyPlan.map((day, index) => (
              <div key={index} className="ios-card">
                <h3 className="text-xl font-bold text-ios-blue mb-3">
                  اليوم {day.day}: {day.title}
                </h3>
                <p className="text-gray-700 mb-4">{day.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  {day.morning && (
                    <div className="border-r-2 border-ios-blue pr-3">
                      <h4 className="font-bold text-gray-800 mb-2 flex items-center">
                        <FaSun className="ml-2 text-yellow-500" />
                        الصباح
                      </h4>
                      <h5 className="font-semibold">{day.morning.activity}</h5>
                      <p className="text-gray-600 text-sm mb-1">
                        <FaMapMarkerAlt className="inline ml-1" size={12} />
                        {day.morning.location}
                      </p>
                      <p className="text-gray-700 mb-2">{day.morning.description}</p>
                      <p className="text-gray-600 text-sm">
                        <FaMoneyBillWave className="inline ml-1" size={12} />
                        {day.morning.cost}
                      </p>
                    </div>
                  )}
                  
                  {day.afternoon && (
                    <div className="border-r-2 border-ios-blue pr-3">
                      <h4 className="font-bold text-gray-800 mb-2 flex items-center">
                        <FaCloudSun className="ml-2 text-orange-500" />
                        الظهيرة
                      </h4>
                      <h5 className="font-semibold">{day.afternoon.activity}</h5>
                      <p className="text-gray-600 text-sm mb-1">
                        <FaMapMarkerAlt className="inline ml-1" size={12} />
                        {day.afternoon.location}
                      </p>
                      <p className="text-gray-700 mb-2">{day.afternoon.description}</p>
                      <p className="text-gray-600 text-sm">
                        <FaMoneyBillWave className="inline ml-1" size={12} />
                        {day.afternoon.cost}
                      </p>
                    </div>
                  )}
                  
                  {day.evening && (
                    <div>
                      <h4 className="font-bold text-gray-800 mb-2 flex items-center">
                        <FaMoon className="ml-2 text-indigo-500" />
                        المساء
                      </h4>
                      <h5 className="font-semibold">{day.evening.activity}</h5>
                      <p className="text-gray-600 text-sm mb-1">
                        <FaMapMarkerAlt className="inline ml-1" size={12} />
                        {day.evening.location}
                      </p>
                      <p className="text-gray-700 mb-2">{day.evening.description}</p>
                      <p className="text-gray-600 text-sm">
                        <FaMoneyBillWave className="inline ml-1" size={12} />
                        {day.evening.cost}
                      </p>
                    </div>
                  )}
                </div>
                
                {day.meals && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h4 className="font-bold text-gray-800 mb-3 flex items-center">
                      <FaUtensils className="ml-2 text-ios-blue" />
                      الوجبات
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {day.meals.breakfast && (
                        <div>
                          <h5 className="font-semibold">الإفطار</h5>
                          <p>{day.meals.breakfast.recommendation}</p>
                          <p className="text-gray-600 text-sm">
                            <FaMoneyBillWave className="inline ml-1" size={12} />
                            {day.meals.breakfast.cost}
                          </p>
                        </div>
                      )}
                      
                      {day.meals.lunch && (
                        <div>
                          <h5 className="font-semibold">الغداء</h5>
                          <p>{day.meals.lunch.recommendation}</p>
                          <p className="text-gray-600 text-sm">
                            <FaMoneyBillWave className="inline ml-1" size={12} />
                            {day.meals.lunch.cost}
                          </p>
                        </div>
                      )}
                      
                      {day.meals.dinner && (
                        <div>
                          <h5 className="font-semibold">العشاء</h5>
                          <p>{day.meals.dinner.recommendation}</p>
                          <p className="text-gray-600 text-sm">
                            <FaMoneyBillWave className="inline ml-1" size={12} />
                            {day.meals.dinner.cost}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        );
        
      case 'budget':
        return (
          <div className="space-y-6">
            {plan.budget && (
              <>
                <div className="ios-card">
                  <h3 className="text-xl font-bold text-ios-blue mb-4">ملخص الميزانية</h3>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-gray-700">الميزانية الإجمالية:</span>
                    <span className="font-bold text-lg">{plan.budget.total}</span>
                  </div>
                  
                  <div className="h-8 bg-gray-200 rounded-full overflow-hidden">
                    {plan.budget.accommodation && (
                      <div 
                        className="h-full bg-ios-blue" 
                        style={{ width: plan.budget.accommodation.percentage }}
                        title={`الإقامة: ${plan.budget.accommodation.percentage}`}
                      ></div>
                    )}
                  </div>
                </div>
                
                <div className="ios-card">
                  <h3 className="text-lg font-bold mb-4">تفاصيل الميزانية</h3>
                  
                  <div className="space-y-4">
                    {plan.budget.accommodation && (
                      <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                        <div>
                          <h4 className="font-bold">الإقامة</h4>
                          <p className="text-gray-600 text-sm">{plan.budget.accommodation.percentage}</p>
                        </div>
                        <span className="font-bold">{plan.budget.accommodation.amount}</span>
                      </div>
                    )}
                    
                    {plan.budget.transportation && (
                      <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                        <div>
                          <h4 className="font-bold">المواصلات</h4>
                          <p className="text-gray-600 text-sm">{plan.budget.transportation.percentage}</p>
                        </div>
                        <span className="font-bold">{plan.budget.transportation.amount}</span>
                      </div>
                    )}
                    
                    {plan.budget.food && (
                      <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                        <div>
                          <h4 className="font-bold">الطعام والشراب</h4>
                          <p className="text-gray-600 text-sm">{plan.budget.food.percentage}</p>
                        </div>
                        <span className="font-bold">{plan.budget.food.amount}</span>
                      </div>
                    )}
                    
                    {plan.budget.activities && (
                      <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                        <div>
                          <h4 className="font-bold">الأنشطة والمعالم السياحية</h4>
                          <p className="text-gray-600 text-sm">{plan.budget.activities.percentage}</p>
                        </div>
                        <span className="font-bold">{plan.budget.activities.amount}</span>
                      </div>
                    )}
                    
                    {plan.budget.shopping && (
                      <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                        <div>
                          <h4 className="font-bold">التسوق والهدايا</h4>
                          <p className="text-gray-600 text-sm">{plan.budget.shopping.percentage}</p>
                        </div>
                        <span className="font-bold">{plan.budget.shopping.amount}</span>
                      </div>
                    )}
                    
                    {plan.budget.emergency && (
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-bold">احتياطي للطوارئ</h4>
                          <p className="text-gray-600 text-sm">{plan.budget.emergency.percentage}</p>
                        </div>
                        <span className="font-bold">{plan.budget.emergency.amount}</span>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        );
        
      case 'tips':
        return (
          <div className="space-y-6">
            {plan.tips && plan.tips.map((tip, index) => (
              <div key={index} className="ios-card">
                <div className="flex items-start">
                  <div className="bg-ios-blue text-white rounded-full w-8 h-8 flex items-center justify-center ml-3 mt-1">
                    <span>{index + 1}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-ios-blue mb-1">{tip.title}</h3>
                    <div className="mb-2">
                      <span className="bg-ios-light-gray text-gray-700 px-2 py-1 rounded-full text-xs">
                        {tip.category}
                      </span>
                    </div>
                    <p className="text-gray-700">{tip.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
        
      default:
        return <p>يرجى اختيار قسم لعرض المعلومات.</p>;
    }
  };
  
  // وظيفة للتعرف على الأيام في خطة الرحلة وتقسيمها
  const extractDays = (text) => {
    if (!text) return [];
    
    // البحث عن نمط "اليوم [الرقم]" أو "اليوم الأول" إلخ
    const dayRegex = /(اليوم (?:الأول|الثاني|الثالث|الرابع|الخامس|السادس|السابع|الثامن|التاسع|العاشر|\d+))/gi;
    const dayMatches = text.match(dayRegex);
    
    if (!dayMatches) return [];
    
    const days = [];
    
    for (let i = 0; i < dayMatches.length; i++) {
      const dayTitle = dayMatches[i];
      const nextDayTitle = dayMatches[i + 1];
      
      let dayContent;
      if (nextDayTitle) {
        const startIndex = text.indexOf(dayTitle);
        const endIndex = text.indexOf(nextDayTitle);
        dayContent = text.substring(startIndex, endIndex);
      } else {
        const startIndex = text.indexOf(dayTitle);
        dayContent = text.substring(startIndex);
      }
      
      days.push({
        title: dayTitle,
        content: dayContent
      });
    }
    
    return days;
  };

  // استخراج الأيام من خطة الرحلة
  const days = extractDays(plan);

  // التحقق من وجود خطة سفر
  if (!plan) {
    return (
      <div className="flex flex-col items-center justify-center h-64 p-4 text-center">
        <div className="text-4xl mb-4">⏳</div>
        <h3 className="text-xl font-bold mb-2">جاري إنشاء خطة السفر...</h3>
        <p className="text-gray-600">يرجى الانتظار بينما نقوم بإعداد خطة سفر مخصصة لك.</p>
      </div>
    );
  }

  // التحقق من وجود خطأ
  if (plan.error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 p-4 text-center">
        <div className="text-4xl mb-4">⚠️</div>
        <h3 className="text-xl font-bold mb-2">حدث خطأ أثناء إنشاء خطة السفر</h3>
        <p className="text-gray-600">{plan.error}</p>
        <button 
          className="mt-4 px-4 py-2 bg-ios-blue text-white rounded-lg hover:bg-blue-600 transition-colors"
          onClick={() => window.location.reload()}
        >
          إعادة المحاولة
        </button>
      </div>
    );
  }

  // التحقق من وجود نص خام فقط (في حالة فشل تحليل JSON)
  if (plan.rawText && !plan.overview) {
    return (
      <div className="p-4">
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="mr-3">
              <p className="text-sm text-yellow-700">
                لم نتمكن من تنسيق خطة السفر بشكل صحيح. فيما يلي النص الخام للخطة.
              </p>
            </div>
          </div>
        </div>
        <div className="whitespace-pre-wrap bg-white p-4 rounded-lg shadow">{plan.rawText}</div>
      </div>
    );
  }

  return (
    <div className="ios-card max-w-4xl mx-auto" dir="rtl">
      {/* عرض صورة الوجهة */}
      {destinationImage && (
        <div className="mb-6 rounded-t-lg overflow-hidden -mt-6 -mx-6">
          <div className="relative h-64 bg-gray-200">
            <img 
              src={destinationImage} 
              alt={`صورة ${travelData.destination}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white p-4">
              <h2 className="text-2xl font-bold">{travelData.destination}</h2>
              <p className="text-sm opacity-90">
                {travelData.startDate} - {travelData.endDate}
              </p>
            </div>
            <button 
              onClick={() => setShowGallery(!showGallery)}
              className="absolute top-2 right-2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
              aria-label="عرض المزيد من الصور"
            >
              <FaImage />
            </button>
          </div>
        </div>
      )}
      
      {/* معرض الصور */}
      {showGallery && travelData && (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-bold">معرض صور {travelData.destination}</h3>
            <button 
              onClick={() => setShowGallery(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              إغلاق
            </button>
          </div>
          <ImageGallery destination={travelData.destination} />
        </div>
      )}
      
      <div className="flex flex-wrap border-b border-gray-200 mb-6">
        {/* علامات التبويب */}
        <button
          onClick={() => setActiveTab('summary')}
          className={`px-6 py-3 font-medium ios-transition ${
            activeTab === 'summary' ? 'text-ios-blue border-b-2 border-ios-blue' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <FaPlaneDeparture className="inline-block ml-1" /> ملخص الرحلة
        </button>
        
        <button
          onClick={() => setActiveTab('accommodation')}
          className={`px-6 py-3 font-medium ios-transition ${
            activeTab === 'accommodation' ? 'text-ios-blue border-b-2 border-ios-blue' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <FaBed className="inline-block ml-1" /> الإقامة
        </button>
        
        <button
          onClick={() => setActiveTab('itinerary')}
          className={`px-6 py-3 font-medium ios-transition ${
            activeTab === 'itinerary' ? 'text-ios-blue border-b-2 border-ios-blue' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <FaCalendarDay className="inline-block ml-1" /> البرنامج اليومي
        </button>
        
        <button
          onClick={() => setActiveTab('budget')}
          className={`px-6 py-3 font-medium ios-transition ${
            activeTab === 'budget' ? 'text-ios-blue border-b-2 border-ios-blue' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <FaTags className="inline-block ml-1" /> الميزانية
        </button>
        
        <button
          onClick={() => setActiveTab('tips')}
          className={`px-6 py-3 font-medium ios-transition ${
            activeTab === 'tips' ? 'text-ios-blue border-b-2 border-ios-blue' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <FaLightbulb className="inline-block ml-1" /> نصائح مفيدة
        </button>
        
        <button
          onClick={() => setActiveTab('json')}
          className={`px-6 py-3 font-medium ios-transition ${
            activeTab === 'json' ? 'text-ios-blue border-b-2 border-ios-blue' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <FaCode className="inline-block ml-1" /> JSON
        </button>
      </div>

      {/* عرض ملخص معلومات الرحلة */}
      <div className="bg-ios-light-gray rounded-ios p-4 mb-6 flex flex-wrap items-center justify-between">
        <div className="mb-3 md:mb-0">
          <span className="font-bold">الوجهة:</span> {travelData.destination}
        </div>
        <div className="mb-3 md:mb-0">
          <span className="font-bold">المدة:</span> {travelData.duration} أيام
        </div>
        <div className="mb-3 md:mb-0">
          <span className="font-bold">المسافرون:</span> {travelData.travelers} أشخاص
        </div>
        <div className="mb-3 md:mb-0">
          <span className="font-bold">الميزانية:</span> {travelData.budget} {travelData.currency}
        </div>
      </div>

      {/* محتوى علامة التبويب النشطة */}
      <div className="plan-content">
        {activeTab === 'summary' && (
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <FaMapMarkedAlt className="ml-2 text-ios-blue" />
              ملخص الرحلة
            </h3>
            {renderPlanContent()}
          </div>
        )}
        
        {activeTab === 'accommodation' && (
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <FaBed className="ml-2 text-ios-blue" />
              تفاصيل الإقامة
            </h3>
            {renderPlanContent()}
          </div>
        )}
        
        {activeTab === 'itinerary' && (
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <FaCalendarDay className="ml-2 text-ios-blue" />
              البرنامج اليومي
            </h3>
            {days && days.length > 0 ? (
              days.map((day, index) => (
                <div key={index} className="mb-6 ios-card">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-lg font-bold text-ios-blue">
                      اليوم {index + 1}
                    </h4>
                    <div className="flex space-x-2 space-x-reverse">
                      <span className="bg-ios-light-gray text-gray-600 px-3 py-1 rounded-full text-sm flex items-center">
                        <FaSun className="ml-1 text-yellow-500" />
                        صباحًا
                      </span>
                      <span className="bg-ios-light-gray text-gray-600 px-3 py-1 rounded-full text-sm flex items-center">
                        <FaMoon className="ml-1 text-indigo-500" />
                        مساءً
                      </span>
                    </div>
                  </div>
                  <div className="text-gray-700">
                    {day}
                  </div>
                </div>
              ))
            ) : (
              renderPlanContent()
            )}
          </div>
        )}
        
        {activeTab === 'budget' && (
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <FaTags className="ml-2 text-ios-blue" />
              توزيع الميزانية
            </h3>
            {renderPlanContent()}
          </div>
        )}
        
        {activeTab === 'tips' && (
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <FaLightbulb className="ml-2 text-ios-blue" />
              نصائح مفيدة
            </h3>
            {renderPlanContent()}
          </div>
        )}
        
        {activeTab === 'json' && (
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <FaCode className="ml-2 text-ios-blue" />
              JSON
            </h3>
            <pre className="text-gray-700">
              {JSON.stringify(plan, null, 2)}
            </pre>
          </div>
        )}
      </div>
      
      {/* أزرار للمشاركة والطباعة */}
      <div className="mt-6 border-t border-gray-200 pt-6 flex justify-between">
        <div className="flex space-x-2 space-x-reverse">
          {isSaved ? (
            <button 
              onClick={handleRemoveSavedPlan} 
              className="ios-button bg-ios-red flex items-center"
              title="إلغاء حفظ الخطة"
            >
              <FaSave className="ml-1" /> إلغاء الحفظ
            </button>
          ) : (
            <button 
              onClick={handleSavePlan} 
              className="ios-button bg-ios-blue flex items-center"
              title="حفظ الخطة"
            >
              <FaSave className="ml-1" /> حفظ الخطة
            </button>
          )}
          
          <button 
            onClick={handleDownloadPlan} 
            className="ios-button bg-ios-green flex items-center"
            title="تنزيل الخطة"
          >
            <FaDownload className="ml-1" /> تنزيل
          </button>
          
          <button 
            onClick={() => setShowShareOptions(!showShareOptions)} 
            className="ios-button bg-ios-purple flex items-center"
            title="مشاركة الخطة"
          >
            <FaShare className="ml-1" /> مشاركة
          </button>
        </div>
        
        <button 
          onClick={() => window.print()} 
          className="ios-button bg-ios-gray"
        >
          طباعة الخطة
        </button>
      </div>
      
      {/* خيارات المشاركة */}
      {showShareOptions && (
        <div className="mt-4 p-4 bg-gray-50 rounded-md">
          <h4 className="text-lg font-bold mb-3">مشاركة الخطة</h4>
          <div className="flex space-x-4 space-x-reverse">
            <WhatsappShareButton 
              url={window.location.href} 
              title={`خطة سفر إلى ${travelData.destination}`}
              className="flex flex-col items-center"
            >
              <WhatsappIcon size={40} round />
              <span className="text-sm mt-1">واتساب</span>
            </WhatsappShareButton>
            
            <EmailShareButton 
              url={window.location.href} 
              subject={`خطة سفر إلى ${travelData.destination}`}
              body={`مرحبًا! إليك خطة سفر إلى ${travelData.destination}:\n\n${JSON.stringify(plan, null, 2)}`}
              className="flex flex-col items-center"
            >
              <EmailIcon size={40} round />
              <span className="text-sm mt-1">البريد</span>
            </EmailShareButton>
            
            <TwitterShareButton 
              url={window.location.href} 
              title={`خطة سفر رائعة إلى ${travelData.destination} 🌍✈️`}
              className="flex flex-col items-center"
            >
              <TwitterIcon size={40} round />
              <span className="text-sm mt-1">تويتر</span>
            </TwitterShareButton>
            
            <FacebookShareButton 
              url={window.location.href} 
              quote={`خطة سفر إلى ${travelData.destination}`}
              className="flex flex-col items-center"
            >
              <FacebookIcon size={40} round />
              <span className="text-sm mt-1">فيسبوك</span>
            </FacebookShareButton>
          </div>
        </div>
      )}
    </div>
  );
}
