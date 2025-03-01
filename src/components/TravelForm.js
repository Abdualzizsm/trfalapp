import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaMapMarkerAlt, FaCalendarAlt, FaUsers, FaMoneyBillWave, FaPaperPlane, FaGlobeAmericas, FaInfoCircle } from 'react-icons/fa';

export default function TravelForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    destination: '',
    startDate: new Date(),
    endDate: new Date(new Date().setDate(new Date().getDate() + 7)),
    travelers: 1,
    budget: 1000,
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [durationDays, setDurationDays] = useState(7);

  // تحديث مدة الرحلة عند تغيير التواريخ
  useEffect(() => {
    if (formData.startDate && formData.endDate) {
      const startDate = new Date(formData.startDate);
      const endDate = new Date(formData.endDate);
      const durationInTime = endDate.getTime() - startDate.getTime();
      const days = Math.ceil(durationInTime / (1000 * 3600 * 24));
      setDurationDays(days);
    }
  }, [formData.startDate, formData.endDate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setTouched((prev) => ({ ...prev, [name]: true }));
    
    // إزالة الخطأ عند تغيير القيمة
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleDateChange = (date, field) => {
    setFormData((prev) => ({ ...prev, [field]: date }));
    setTouched((prev) => ({ ...prev, [field]: true }));
    
    // إزالة الخطأ عند تغيير التاريخ
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.destination.trim()) {
      newErrors.destination = 'الرجاء إدخال وجهة السفر';
    }
    
    if (!formData.startDate) {
      newErrors.startDate = 'الرجاء اختيار تاريخ البداية';
    }
    
    if (!formData.endDate) {
      newErrors.endDate = 'الرجاء اختيار تاريخ النهاية';
    }
    
    if (formData.startDate && formData.endDate && formData.startDate > formData.endDate) {
      newErrors.endDate = 'يجب أن يكون تاريخ النهاية بعد تاريخ البداية';
    }
    
    if (formData.travelers < 1) {
      newErrors.travelers = 'يجب أن يكون عدد المسافرين على الأقل 1';
    }
    
    if (formData.budget < 100) {
      newErrors.budget = 'يجب أن تكون الميزانية على الأقل 100 دولار';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // تعيين جميع الحقول كـ "touched" عند تقديم النموذج
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(allTouched);
    
    if (validateForm()) {
      // حساب مدة الرحلة بالأيام
      const startDate = new Date(formData.startDate);
      const endDate = new Date(formData.endDate);
      const durationInTime = endDate.getTime() - startDate.getTime();
      const durationInDays = Math.ceil(durationInTime / (1000 * 3600 * 24));
      
      // إعداد بيانات الرحلة
      const travelData = {
        ...formData,
        startDate: formData.startDate.toISOString().split('T')[0],
        endDate: formData.endDate.toISOString().split('T')[0],
        duration: durationInDays,
      };
      
      // إرسال البيانات
      onSubmit(travelData);
    }
  };

  // اقتراحات للوجهات الشائعة
  const popularDestinations = [
    'دبي، الإمارات',
    'باريس، فرنسا',
    'طوكيو، اليابان',
    'لندن، المملكة المتحدة',
    'نيويورك، الولايات المتحدة',
    'روما، إيطاليا',
    'بالي، إندونيسيا',
    'مراكش، المغرب',
    'القاهرة، مصر',
    'اسطنبول، تركيا'
  ];

  const handleSuggestionClick = (destination) => {
    setFormData(prev => ({ ...prev, destination }));
    setTouched(prev => ({ ...prev, destination: true }));
    
    // إزالة الخطأ عند اختيار اقتراح
    if (errors.destination) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.destination;
        return newErrors;
      });
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg">
      <div className="mb-6 flex items-center justify-center">
        <FaGlobeAmericas className="text-4xl text-ios-blue ml-3" />
        <h2 className="text-2xl font-bold text-gray-800">خطط رحلتك</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <label htmlFor="destination" className="block font-medium flex items-center text-gray-700">
            <FaMapMarkerAlt className="ml-1 text-ios-blue" />
            الوجهة
          </label>
          <input
            type="text"
            id="destination"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            placeholder="مثال: دبي، باريس، طوكيو"
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-ios-blue focus:outline-none transition-colors duration-200 ${
              errors.destination && touched.destination ? 'border-ios-red bg-red-50' : 'border-gray-300'
            }`}
          />
          {errors.destination && touched.destination && (
            <p className="text-ios-red text-sm flex items-center">
              <FaInfoCircle className="ml-1" />
              {errors.destination}
            </p>
          )}
          
          {/* اقتراحات الوجهات */}
          <div className="mt-2">
            <p className="text-sm text-gray-500 mb-2">وجهات شائعة:</p>
            <div className="flex flex-wrap gap-2">
              {popularDestinations.slice(0, 5).map((dest) => (
                <button
                  key={dest}
                  type="button"
                  onClick={() => handleSuggestionClick(dest)}
                  className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 py-1 px-2 rounded-full transition-colors duration-200"
                >
                  {dest}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="startDate" className="block font-medium flex items-center text-gray-700">
              <FaCalendarAlt className="ml-1 text-ios-blue" />
              تاريخ البداية
            </label>
            <DatePicker
              id="startDate"
              selected={formData.startDate}
              onChange={(date) => handleDateChange(date, 'startDate')}
              selectsStart
              startDate={formData.startDate}
              endDate={formData.endDate}
              minDate={new Date()}
              dateFormat="dd/MM/yyyy"
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-ios-blue focus:outline-none transition-colors duration-200 ${
                errors.startDate && touched.startDate ? 'border-ios-red bg-red-50' : 'border-gray-300'
              }`}
            />
            {errors.startDate && touched.startDate && (
              <p className="text-ios-red text-sm flex items-center">
                <FaInfoCircle className="ml-1" />
                {errors.startDate}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="endDate" className="block font-medium flex items-center text-gray-700">
              <FaCalendarAlt className="ml-1 text-ios-blue" />
              تاريخ النهاية
            </label>
            <DatePicker
              id="endDate"
              selected={formData.endDate}
              onChange={(date) => handleDateChange(date, 'endDate')}
              selectsEnd
              startDate={formData.startDate}
              endDate={formData.endDate}
              minDate={formData.startDate}
              dateFormat="dd/MM/yyyy"
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-ios-blue focus:outline-none transition-colors duration-200 ${
                errors.endDate && touched.endDate ? 'border-ios-red bg-red-50' : 'border-gray-300'
              }`}
            />
            {errors.endDate && touched.endDate && (
              <p className="text-ios-red text-sm flex items-center">
                <FaInfoCircle className="ml-1" />
                {errors.endDate}
              </p>
            )}
          </div>
        </div>
        
        {/* عرض مدة الرحلة */}
        <div className="bg-blue-50 p-3 rounded-lg text-center">
          <p className="text-ios-blue font-medium">
            مدة الرحلة: {durationDays} {durationDays === 1 ? 'يوم' : 'أيام'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="travelers" className="block font-medium flex items-center text-gray-700">
              <FaUsers className="ml-1 text-ios-blue" />
              عدد المسافرين
            </label>
            <input
              type="number"
              id="travelers"
              name="travelers"
              value={formData.travelers}
              onChange={handleChange}
              min="1"
              max="20"
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-ios-blue focus:outline-none transition-colors duration-200 ${
                errors.travelers && touched.travelers ? 'border-ios-red bg-red-50' : 'border-gray-300'
              }`}
            />
            {errors.travelers && touched.travelers && (
              <p className="text-ios-red text-sm flex items-center">
                <FaInfoCircle className="ml-1" />
                {errors.travelers}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="budget" className="block font-medium flex items-center text-gray-700">
              <FaMoneyBillWave className="ml-1 text-ios-blue" />
              الميزانية (بالدولار)
            </label>
            <input
              type="number"
              id="budget"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              min="100"
              step="100"
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-ios-blue focus:outline-none transition-colors duration-200 ${
                errors.budget && touched.budget ? 'border-ios-red bg-red-50' : 'border-gray-300'
              }`}
            />
            {errors.budget && touched.budget && (
              <p className="text-ios-red text-sm flex items-center">
                <FaInfoCircle className="ml-1" />
                {errors.budget}
              </p>
            )}
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-ios-blue hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center"
          >
            <FaPaperPlane className="ml-2" />
            إنشاء خطة السفر
          </button>
        </div>
      </form>
    </div>
  );
}
