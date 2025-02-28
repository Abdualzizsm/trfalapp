import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { FaPlane, FaCalendarAlt, FaUsers, FaMoneyBillWave, FaMapMarkerAlt, FaInfoCircle } from 'react-icons/fa';

const tripTypes = [
  { id: 'romantic', label: 'رومانسية' },
  { id: 'family', label: 'عائلية' },
  { id: 'friends', label: 'مع الأصدقاء' },
  { id: 'solo', label: 'منفردة' },
  { id: 'adventure', label: 'مغامرة' },
  { id: 'cultural', label: 'ثقافية' },
  { id: 'relaxation', label: 'استرخاء' },
];

const countries = [
  'الإمارات العربية المتحدة', 'المملكة العربية السعودية', 'تركيا', 'ماليزيا', 'المملكة المتحدة',
  'فرنسا', 'إيطاليا', 'إسبانيا', 'الولايات المتحدة', 'اليابان', 'كوريا الجنوبية', 'تايلاند',
  'إندونيسيا', 'سنغافورة', 'مصر', 'المغرب', 'الأردن', 'لبنان', 'عمان', 'البحرين',
  'الكويت', 'قطر', 'الهند', 'المالديف', 'سويسرا', 'ألمانيا', 'النمسا', 'هولندا'
];

export default function TravelForm({ onSubmit, isLoading }) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date(new Date().setDate(new Date().getDate() + 7)));
  const [formData, setFormData] = useState({
    destination: '',
    budget: 5000,
    travelers: 2,
    tripType: 'romantic',
    additionalRequirements: '',
    currency: 'دولار'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // تحويل التواريخ إلى تنسيق مناسب (مثلًا: YYYY-MM-DD)
    const formattedStartDate = startDate.toISOString().split('T')[0];
    const formattedEndDate = endDate.toISOString().split('T')[0];
    
    // حساب عدد أيام الرحلة
    const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    
    onSubmit({
      ...formData,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      duration: days
    });
  };

  return (
    <form onSubmit={handleSubmit} className="ios-card max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800" dir="rtl">
        <FaPlane className="inline-block ml-2 text-ios-blue" />
        خطط رحلتك الذكية
      </h2>
      
      {/* اختيار الوجهة */}
      <div className="mb-5" dir="rtl">
        <label className="block text-gray-700 mb-2 font-semibold flex items-center">
          <FaMapMarkerAlt className="ml-2 text-ios-blue" />
          الوجهة
        </label>
        <select
          name="destination"
          value={formData.destination}
          onChange={handleChange}
          required
          className="ios-input w-full"
        >
          <option value="" disabled>اختر وجهة السفر</option>
          {countries.map(country => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>
      </div>

      {/* الميزانية */}
      <div className="mb-5" dir="rtl">
        <label className="block text-gray-700 mb-2 font-semibold flex items-center">
          <FaMoneyBillWave className="ml-2 text-ios-blue" />
          الميزانية ({formData.budget} {formData.currency})
        </label>
        <div className="flex items-center">
          <input
            type="range"
            name="budget"
            min="500"
            max="50000"
            step="500"
            value={formData.budget}
            onChange={handleChange}
            className="flex-grow"
          />
          <select 
            name="currency" 
            value={formData.currency} 
            onChange={handleChange}
            className="ios-input ml-2 w-24"
          >
            <option value="دولار">دولار</option>
            <option value="يورو">يورو</option>
            <option value="ريال">ريال</option>
            <option value="درهم">درهم</option>
          </select>
        </div>
      </div>

      {/* تواريخ السفر */}
      <div className="mb-5 grid grid-cols-2 gap-4" dir="rtl">
        <div>
          <label className="block text-gray-700 mb-2 font-semibold flex items-center">
            <FaCalendarAlt className="ml-2 text-ios-blue" />
            تاريخ البداية
          </label>
          <DatePicker
            selected={startDate}
            onChange={date => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            minDate={new Date()}
            className="ios-input w-full"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2 font-semibold flex items-center">
            <FaCalendarAlt className="ml-2 text-ios-blue" />
            تاريخ النهاية
          </label>
          <DatePicker
            selected={endDate}
            onChange={date => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            className="ios-input w-full"
          />
        </div>
      </div>

      {/* عدد المسافرين */}
      <div className="mb-5" dir="rtl">
        <label className="block text-gray-700 mb-2 font-semibold flex items-center">
          <FaUsers className="ml-2 text-ios-blue" />
          عدد المسافرين
        </label>
        <input
          type="number"
          name="travelers"
          min="1"
          max="10"
          value={formData.travelers}
          onChange={handleChange}
          className="ios-input w-full"
        />
      </div>

      {/* نوع الرحلة */}
      <div className="mb-5" dir="rtl">
        <label className="block text-gray-700 mb-2 font-semibold">نوع الرحلة</label>
        <div className="grid grid-cols-3 gap-2">
          {tripTypes.map(type => (
            <label key={type.id} className={`
              flex items-center justify-center p-3 rounded-ios cursor-pointer ios-transition
              ${formData.tripType === type.id 
                ? 'bg-ios-blue text-white' 
                : 'bg-ios-light-gray text-gray-700 hover:bg-gray-200'}
            `}>
              <input
                type="radio"
                name="tripType"
                value={type.id}
                checked={formData.tripType === type.id}
                onChange={handleChange}
                className="sr-only"
              />
              {type.label}
            </label>
          ))}
        </div>
      </div>

      {/* متطلبات إضافية */}
      <div className="mb-5" dir="rtl">
        <label className="block text-gray-700 mb-2 font-semibold flex items-center">
          <FaInfoCircle className="ml-2 text-ios-blue" />
          متطلبات إضافية (اختياري)
        </label>
        <textarea
          name="additionalRequirements"
          value={formData.additionalRequirements}
          onChange={handleChange}
          placeholder="مثال: أحتاج إلى أنشطة مناسبة للأطفال، لا أفضل السفر بالطائرة، إلخ..."
          className="ios-input w-full h-24"
        />
      </div>

      {/* زر الإرسال */}
      <button
        type="submit"
        disabled={isLoading}
        className={`ios-button w-full text-lg ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            جاري إنشاء خطة الرحلة...
          </span>
        ) : 'إنشاء خطة الرحلة'}
      </button>
    </form>
  );
}
