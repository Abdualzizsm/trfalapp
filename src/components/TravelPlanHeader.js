import { useState } from 'react';
import { FaMapMarkedAlt, FaShare, FaDownload, FaClipboard, FaPrint, FaCheck, FaInfoCircle, FaPlane, FaHotel, FaUtensils, FaCalendarAlt } from 'react-icons/fa';
import { EmailShareButton, WhatsappShareButton, TwitterShareButton, FacebookShareButton, EmailIcon, WhatsappIcon, TwitterIcon, FacebookIcon } from 'react-share';
import TravelPlanHeader from './TravelPlanHeader';

export default function TravelPlan({ plan }) {
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [copied, setCopied] = useState(false);
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const title = `خطة سفر إلى ${plan?.overview?.title || 'وجهة رائعة'}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const handleDownload = () => {
    // تحويل خطة السفر إلى نص منسق
    const planText = `
      خطة سفر إلى ${plan?.overview?.title || 'وجهة رائعة'}
      
      ${plan?.overview?.description || ''}
      
      معلومات عامة:
      - أفضل وقت للزيارة: ${plan?.overview?.bestTimeToVisit || 'غير محدد'}
      - اللغة: ${plan?.overview?.language || 'غير محدد'}
      - العملة: ${plan?.overview?.currency || 'غير محدد'}
      - المنطقة الزمنية: ${plan?.overview?.timeZone || 'غير محدد'}
      
      أبرز المميزات:
      ${plan?.overview?.highlights?.map(h => `- ${h}`).join('\n') || 'لا توجد معلومات'}
    `;
    
    // إنشاء ملف نصي للتنزيل
    const element = document.createElement('a');
    const file = new Blob([planText], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `خطة_سفر_${plan?.overview?.title || 'وجهة'}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="mb-6">
      <TravelPlanHeader planData={plan} onBack={() => console.log('Back button clicked')} />
      
      {/* وصف الخطة */}
      <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
        <p className="text-gray-700 leading-relaxed text-lg">{plan?.overview?.description}</p>
      </div>

      {/* معلومات عامة عن الوجهة */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 flex flex-col items-center">
          <div className="bg-blue-50 p-2 rounded-full mb-2">
            <FaCalendarAlt className="text-ios-blue text-xl" />
          </div>
          <div className="font-bold text-ios-blue mb-1 text-center">أفضل وقت للزيارة</div>
          <div className="text-center">{plan?.overview?.bestTimeToVisit || 'غير محدد'}</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 flex flex-col items-center">
          <div className="bg-blue-50 p-2 rounded-full mb-2">
            <FaInfoCircle className="text-ios-blue text-xl" />
          </div>
          <div className="font-bold text-ios-blue mb-1 text-center">اللغة</div>
          <div className="text-center">{plan?.overview?.language || 'غير محدد'}</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 flex flex-col items-center">
          <div className="bg-blue-50 p-2 rounded-full mb-2">
            <FaInfoCircle className="text-ios-blue text-xl" />
          </div>
          <div className="font-bold text-ios-blue mb-1 text-center">العملة</div>
          <div className="text-center">{plan?.overview?.currency || 'غير محدد'}</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 flex flex-col items-center">
          <div className="bg-blue-50 p-2 rounded-full mb-2">
            <FaInfoCircle className="text-ios-blue text-xl" />
          </div>
          <div className="font-bold text-ios-blue mb-1 text-center">المنطقة الزمنية</div>
          <div className="text-center">{plan?.overview?.timeZone || 'غير محدد'}</div>
        </div>
      </div>

      {/* أبرز المميزات */}
      {plan?.overview?.highlights && plan.overview.highlights.length > 0 && (
        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
          <h3 className="font-bold text-xl mb-4 flex items-center text-gray-800">
            <FaInfoCircle className="ml-2 text-ios-blue" />
            أبرز المميزات
          </h3>
          <ul className="space-y-3">
            {plan.overview.highlights.map((highlight, index) => (
              <li key={index} className="flex items-start">
                <span className="bg-blue-50 p-1 rounded-full flex-shrink-0 mt-1 ml-2">
                  <FaCheck className="text-ios-blue text-sm" />
                </span>
                <span className="text-gray-700">{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {/* خيارات المشاركة */}
      <div className="relative">
        <button 
          className="ios-button ios-button-secondary flex items-center hover:bg-gray-100 transition-colors duration-200"
          onClick={() => setShowShareOptions(!showShareOptions)}
        >
          <FaShare className="ml-1" />
          <span className="hidden sm:inline">مشاركة</span>
        </button>
        
        {showShareOptions && (
          <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-2 z-10">
            <div className="flex flex-col space-y-2">
              <div className="flex justify-between p-2 hover:bg-gray-50 rounded cursor-pointer" onClick={handleCopyLink}>
                <span className="text-sm font-medium">نسخ الرابط</span>
                {copied ? <FaCheck className="text-green-500" /> : <FaClipboard />}
              </div>
              <div className="flex justify-between p-2 hover:bg-gray-50 rounded cursor-pointer" onClick={handlePrint}>
                <span className="text-sm font-medium">طباعة</span>
                <FaPrint />
              </div>
              <div className="border-t my-1"></div>
              <div className="flex justify-center space-x-2 space-x-reverse p-2">
                <WhatsappShareButton url={shareUrl} title={title}>
                  <WhatsappIcon size={32} round />
                </WhatsappShareButton>
                <FacebookShareButton url={shareUrl} quote={title}>
                  <FacebookIcon size={32} round />
                </FacebookShareButton>
                <TwitterShareButton url={shareUrl} title={title}>
                  <TwitterIcon size={32} round />
                </TwitterShareButton>
                <EmailShareButton url={shareUrl} subject={title} body="شاهد خطة السفر هذه:">
                  <EmailIcon size={32} round />
                </EmailShareButton>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <button 
        className="ios-button ios-button-secondary flex items-center hover:bg-gray-100 transition-colors duration-200"
        onClick={handleDownload}
      >
        <FaDownload className="ml-1" />
        <span className="hidden sm:inline">تنزيل</span>
      </button>
    </div>
  );
}
