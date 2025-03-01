import { useState } from 'react';
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
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

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="destination" className="block font-medium flex items-center">
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
          className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-ios-blue focus:outline-none ${
            errors.destination ? 'border-ios-red' : 'border-gray-300'
          }`}
        />
        {errors.destination && (
          <p className="text-ios-red text-sm">{errors.destination}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="startDate" className="block font-medium flex items-center">
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
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-ios-blue focus:outline-none ${
              errors.startDate ? 'border-ios-red' : 'border-gray-300'
            }`}
          />
          {errors.startDate && (
            <p className="text-ios-red text-sm">{errors.startDate}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="endDate" className="block font-medium flex items-center">
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
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-ios-blue focus:outline-none ${
              errors.endDate ? 'border-ios-red' : 'border-gray-300'
            }`}
          />
          {errors.endDate && (
            <p className="text-ios-red text-sm">{errors.endDate}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="travelers" className="block font-medium flex items-center">
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
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-ios-blue focus:outline-none ${
              errors.travelers ? 'border-ios-red' : 'border-gray-300'
            }`}
          />
          {errors.travelers && (
            <p className="text-ios-red text-sm">{errors.travelers}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="budget" className="block font-medium flex items-center">
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
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-ios-blue focus:outline-none ${
              errors.budget ? 'border-ios-red' : 'border-gray-300'
            }`}
          />
          {errors.budget && (
            <p className="text-ios-red text-sm">{errors.budget}</p>
          )}
        </div>
      </div>

      <div className="pt-4">
        <button
          type="submit"
          className="w-full ios-button ios-button-primary flex items-center justify-center"
        >
          <FaPaperPlane className="ml-2" />
          إنشاء خطة السفر
        </button>
      </div>
    </form>
  );
}
