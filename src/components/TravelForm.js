import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaMapMarkerAlt, FaCalendarAlt, FaUsers, FaMoneyBillWave, FaPaperPlane } from 'react-icons/fa';

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
      newErrors.destination = 'يرجى إدخال وجهة السفر';
    }
    
    if (!formData.startDate) {
      newErrors.startDate = 'يرجى اختيار تاريخ البداية';
    }
    
    if (!formData.endDate) {
      newErrors.endDate = 'يرجى اختيار تاريخ النهاية';
    }
    
    if (formData.startDate && formData.endDate && formData.startDate > formData.endDate) {
      newErrors.endDate = 'يجب أن يكون تاريخ النهاية بعد تاريخ البداية';
    }
    
    if (formData.travelers < 1) {
      newErrors.travelers = 'يجب أن يكون عدد المسافرين 1 على الأقل';
    }
    
    if (formData.budget < 0) {
      newErrors.budget = 'يجب أن تكون الميزانية قيمة موجبة';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // تحديد جميع الحقول كـ "touched"
    const allTouched = {};
    Object.keys(formData).forEach(key => {
      allTouched[key] = true;
    });
    setTouched(allTouched);
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="ios-card">
      <h2 className="text-xl font-semibold mb-4 text-center">خطط رحلتك الآن</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          {/* وجهة السفر */}
          <div>
            <label htmlFor="destination" className="ios-label">
              <FaMapMarkerAlt className="inline-block ml-1" /> وجهة السفر
            </label>
            <input
              type="text"
              id="destination"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              placeholder="مثال: دبي، باريس، طوكيو"
              className="ios-input"
              dir="rtl"
            />
            {touched.destination && errors.destination && (
              <p className="text-red-500 text-sm mt-1">{errors.destination}</p>
            )}
          </div>
          
          {/* تاريخ البداية والنهاية */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="startDate" className="ios-label">
                <FaCalendarAlt className="inline-block ml-1" /> تاريخ البداية
              </label>
              <DatePicker
                selected={formData.startDate}
                onChange={(date) => handleDateChange(date, 'startDate')}
                selectsStart
                startDate={formData.startDate}
                endDate={formData.endDate}
                dateFormat="dd/MM/yyyy"
                className="ios-input"
                wrapperClassName="w-full"
              />
              {touched.startDate && errors.startDate && (
                <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="endDate" className="ios-label">
                <FaCalendarAlt className="inline-block ml-1" /> تاريخ النهاية
              </label>
              <DatePicker
                selected={formData.endDate}
                onChange={(date) => handleDateChange(date, 'endDate')}
                selectsEnd
                startDate={formData.startDate}
                endDate={formData.endDate}
                minDate={formData.startDate}
                dateFormat="dd/MM/yyyy"
                className="ios-input"
                wrapperClassName="w-full"
              />
              {touched.endDate && errors.endDate && (
                <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>
              )}
            </div>
          </div>
          
          {/* عدد المسافرين والميزانية */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="travelers" className="ios-label">
                <FaUsers className="inline-block ml-1" /> عدد المسافرين
              </label>
              <input
                type="number"
                id="travelers"
                name="travelers"
                value={formData.travelers}
                onChange={handleChange}
                min="1"
                className="ios-input"
              />
              {touched.travelers && errors.travelers && (
                <p className="text-red-500 text-sm mt-1">{errors.travelers}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="budget" className="ios-label">
                <FaMoneyBillWave className="inline-block ml-1" /> الميزانية ($)
              </label>
              <input
                type="number"
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                min="0"
                className="ios-input"
              />
              {touched.budget && errors.budget && (
                <p className="text-red-500 text-sm mt-1">{errors.budget}</p>
              )}
            </div>
          </div>
          
          {/* معلومات الرحلة */}
          <div className="bg-gray-50 p-3 rounded-lg text-sm text-gray-600 mt-2">
            <p>مدة الرحلة: <span className="font-semibold">{durationDays} يوم</span></p>
          </div>
          
          {/* زر الإرسال */}
          <button
            type="submit"
            className="ios-button ios-button-primary w-full mt-4"
          >
            <FaPaperPlane className="ml-2" /> إنشاء خطة السفر
          </button>
        </div>
      </form>
    </div>
  );
}
