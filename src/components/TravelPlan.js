import React, { useState, useEffect } from 'react';
import { FaCalendarDay, FaPlaneDeparture, FaMapMarkedAlt, FaBed, FaUtensils, FaSun, FaMoon, FaTags, FaLightbulb, FaShare, FaSave, FaDownload, FaImage } from 'react-icons/fa';
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
      const planText = `خطة السفر إلى ${travelData.destination}\n\n${plan}`;
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
    
    // تحويل النص إلى HTML مع الحفاظ على التنسيق
    const formatContent = (content) => {
      // تحويل العناوين
      let formattedContent = content
        .replace(/## (.*?)(?=\n|$)/g, '<h2>$1</h2>')
        .replace(/### (.*?)(?=\n|$)/g, '<h3>$1</h3>')
        .replace(/#### (.*?)(?=\n|$)/g, '<h4>$1</h4>');
      
      // تحويل النقاط
      formattedContent = formattedContent.replace(/- (.*?)(?=\n|$)/g, '<li>$1</li>');
      
      // تجميع النقاط في قوائم
      formattedContent = formattedContent.replace(/<li>.*?<\/li>(\n<li>.*?<\/li>)+/g, (match) => {
        return '<ul>' + match + '</ul>';
      });
      
      // تحويل الفقرات
      formattedContent = formattedContent.replace(/(?<!\n<[^>]+>)([^\n<].+?)(?=\n|$)/g, '<p>$1</p>');
      
      // إزالة الأسطر الفارغة المتكررة
      formattedContent = formattedContent.replace(/\n\n+/g, '\n');
      
      return formattedContent;
    };

    // استخراج القسم المناسب من الخطة بناءً على التبويب النشط
    let contentSection = '';
    
    if (activeTab === 'summary') {
      // استخراج قسم نظرة عامة على الوجهة
      if (plan.includes('## 1. نظرة عامة على الوجهة')) {
        contentSection = plan.split('## 1. نظرة عامة على الوجهة')[1].split('## 2. تفاصيل الإقامة')[0];
      } else if (plan.includes('نظرة عامة على الوجهة')) {
        contentSection = plan.split('نظرة عامة على الوجهة')[1].split('تفاصيل الإقامة')[0];
      } else {
        contentSection = plan.split('\n\n')[0] + '\n\n' + plan.split('\n\n')[1];
      }
    } else if (activeTab === 'accommodation') {
      // استخراج قسم تفاصيل الإقامة
      if (plan.includes('## 2. تفاصيل الإقامة')) {
        contentSection = plan.split('## 2. تفاصيل الإقامة')[1].split('## 3. جدول يومي مفصل للأنشطة')[0];
      } else if (plan.includes('تفاصيل الإقامة')) {
        contentSection = plan.split('تفاصيل الإقامة')[1].split('جدول يومي مفصل للأنشطة')[0];
      }
    } else if (activeTab === 'itinerary') {
      // استخراج قسم الجدول اليومي
      if (plan.includes('## 3. جدول يومي مفصل للأنشطة')) {
        contentSection = plan.split('## 3. جدول يومي مفصل للأنشطة')[1].split('## 4. توصيات للمطاعم')[0];
      } else if (plan.includes('جدول يومي مفصل للأنشطة')) {
        contentSection = plan.split('جدول يومي مفصل للأنشطة')[1].split('توصيات للمطاعم')[0];
      }
    } else if (activeTab === 'budget') {
      // استخراج قسم الميزانية
      if (plan.includes('## 5. تقدير تفصيلي للتكاليف')) {
        contentSection = plan.split('## 5. تقدير تفصيلي للتكاليف')[1].split('## 6. نصائح مهمة للسفر')[0];
      } else if (plan.includes('تقدير تفصيلي للتكاليف')) {
        contentSection = plan.split('تقدير تفصيلي للتكاليف')[1].split('نصائح مهمة للسفر')[0];
      }
    } else if (activeTab === 'tips') {
      // استخراج قسم النصائح
      if (plan.includes('## 6. نصائح مهمة للسفر')) {
        contentSection = plan.split('## 6. نصائح مهمة للسفر')[1];
      } else if (plan.includes('نصائح مهمة للسفر')) {
        contentSection = plan.split('نصائح مهمة للسفر')[1];
      }
    }
    
    return (
      <div 
        className="travel-plan-content"
        dangerouslySetInnerHTML={{ __html: formatContent(contentSection) }}
      />
    );
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
              body={`مرحبًا! إليك خطة سفر إلى ${travelData.destination}:\n\n${plan.substring(0, 300)}...`}
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
