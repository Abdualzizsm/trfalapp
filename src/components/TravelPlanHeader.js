import { FaMapMarkedAlt, FaShare, FaDownload } from 'react-icons/fa';
import { EmailShareButton, WhatsappShareButton, TwitterShareButton, FacebookShareButton, EmailIcon, WhatsappIcon, TwitterIcon, FacebookIcon } from 'react-share';

export default function TravelPlanHeader({ plan }) {
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const title = `خطة سفر إلى ${plan?.overview?.title || 'وجهة رائعة'}`;

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold flex items-center">
          <FaMapMarkedAlt className="ml-2 text-ios-blue" />
          {plan?.overview?.title || 'خطة السفر'}
        </h2>
        <div className="flex space-x-2 space-x-reverse">
          <button className="ios-button ios-button-secondary flex items-center">
            <FaShare className="ml-1" />
            <span className="hidden sm:inline">مشاركة</span>
          </button>
          <button className="ios-button ios-button-secondary flex items-center">
            <FaDownload className="ml-1" />
            <span className="hidden sm:inline">تنزيل</span>
          </button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
        <p className="text-gray-700 leading-relaxed">{plan?.overview?.description}</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <div className="bg-white p-3 rounded-lg shadow-sm">
          <div className="font-bold text-ios-blue mb-1">أفضل وقت للزيارة</div>
          <div>{plan?.overview?.bestTimeToVisit || 'غير محدد'}</div>
        </div>
        <div className="bg-white p-3 rounded-lg shadow-sm">
          <div className="font-bold text-ios-blue mb-1">اللغة</div>
          <div>{plan?.overview?.language || 'غير محدد'}</div>
        </div>
        <div className="bg-white p-3 rounded-lg shadow-sm">
          <div className="font-bold text-ios-blue mb-1">العملة</div>
          <div>{plan?.overview?.currency || 'غير محدد'}</div>
        </div>
        <div className="bg-white p-3 rounded-lg shadow-sm">
          <div className="font-bold text-ios-blue mb-1">المنطقة الزمنية</div>
          <div>{plan?.overview?.timeZone || 'غير محدد'}</div>
        </div>
      </div>

      {plan?.overview?.highlights && plan.overview.highlights.length > 0 && (
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="font-bold text-lg mb-2">أبرز المميزات</h3>
          <ul className="list-disc list-inside space-y-1">
            {plan.overview.highlights.map((highlight, index) => (
              <li key={index} className="text-gray-700">{highlight}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-4 flex space-x-2 space-x-reverse justify-center">
        <WhatsappShareButton url={shareUrl} title={title} className="mx-1">
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>
        <FacebookShareButton url={shareUrl} quote={title} className="mx-1">
          <FacebookIcon size={32} round />
        </FacebookShareButton>
        <TwitterShareButton url={shareUrl} title={title} className="mx-1">
          <TwitterIcon size={32} round />
        </TwitterShareButton>
        <EmailShareButton url={shareUrl} subject={title} body="شاهد خطة السفر هذه:" className="mx-1">
          <EmailIcon size={32} round />
        </EmailShareButton>
      </div>
    </div>
  );
}
