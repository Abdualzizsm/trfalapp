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
      // إضافة مدة الرحلة بشكل صريح
      const submissionData = {
        ...formData,
        duration: durationDays // إضافة مدة الرحلة المحسوبة
      };
      onSubmit(submissionData);
    }
  };

  return (
    <div className="card my-4">
      <div className="card-header flex-between">
        <h2 className="font-medium">خطط رحلتك الآن</h2>
        <div className="badge badge-blue">
          <FaPaperPlane className="ml-1" />
          أدخل تفاصيل رحلتك
        </div>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit} className="travel-form">
          <div className="form-group">
            <label htmlFor="destination" className="form-label">
              <FaMapMarkerAlt className="inline-block ml-1 text-primary" /> وجهة السفر
            </label>
            <input
              type="text"
              id="destination"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              placeholder="مثال: دبي، باريس، طوكيو"
              className={`form-input ${touched.destination && errors.destination ? 'error' : ''}`}
            />
            {touched.destination && errors.destination && (
              <div className="form-error">{errors.destination}</div>
            )}
          </div>

          <div className="flex flex-wrap -mx-2">
            <div className="w-1/2 px-2 form-group">
              <label htmlFor="startDate" className="form-label">
                <FaCalendarAlt className="inline-block ml-1 text-primary" /> تاريخ البداية
              </label>
              <DatePicker
                selected={formData.startDate}
                onChange={(date) => handleDateChange(date, 'startDate')}
                selectsStart
                startDate={formData.startDate}
                endDate={formData.endDate}
                dateFormat="dd/MM/yyyy"
                className={`form-input ${touched.startDate && errors.startDate ? 'error' : ''}`}
                wrapperClassName="date-picker"
              />
              {touched.startDate && errors.startDate && (
                <div className="form-error">{errors.startDate}</div>
              )}
            </div>

            <div className="w-1/2 px-2 form-group">
              <label htmlFor="endDate" className="form-label">
                <FaCalendarAlt className="inline-block ml-1 text-primary" /> تاريخ النهاية
              </label>
              <DatePicker
                selected={formData.endDate}
                onChange={(date) => handleDateChange(date, 'endDate')}
                selectsEnd
                startDate={formData.startDate}
                endDate={formData.endDate}
                minDate={formData.startDate}
                dateFormat="dd/MM/yyyy"
                className={`form-input ${touched.endDate && errors.endDate ? 'error' : ''}`}
                wrapperClassName="date-picker"
              />
              {touched.endDate && errors.endDate && (
                <div className="form-error">{errors.endDate}</div>
              )}
            </div>
          </div>

          <div className="text-center text-sm my-2">
            مدة الرحلة: <span className="font-medium">{durationDays} يوم</span>
          </div>

          <div className="flex flex-wrap -mx-2">
            <div className="w-1/2 px-2 form-group">
              <label htmlFor="travelers" className="form-label">
                <FaUsers className="inline-block ml-1 text-primary" /> عدد المسافرين
              </label>
              <input
                type="number"
                id="travelers"
                name="travelers"
                value={formData.travelers}
                onChange={handleChange}
                min="1"
                className={`form-input ${touched.travelers && errors.travelers ? 'error' : ''}`}
              />
              {touched.travelers && errors.travelers && (
                <div className="form-error">{errors.travelers}</div>
              )}
            </div>

            <div className="w-1/2 px-2 form-group">
              <label htmlFor="budget" className="form-label">
                <FaMoneyBillWave className="inline-block ml-1 text-primary" /> الميزانية ($)
              </label>
              <input
                type="number"
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                min="0"
                className={`form-input ${touched.budget && errors.budget ? 'error' : ''}`}
              />
              {touched.budget && errors.budget && (
                <div className="form-error">{errors.budget}</div>
              )}
            </div>
          </div>
          
          <button type="submit" className="btn btn-primary w-full mt-4">
            <FaPaperPlane className="ml-2" /> إنشاء خطة السفر
          </button>
        </form>
      </div>
    </div>
  );
}
