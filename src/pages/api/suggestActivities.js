import { getSuggestedActivities } from '../../utils/openaiService';

export default async function handler(req, res) {
  // التحقق من طريقة الطلب
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'طريقة الطلب غير مدعومة' });
  }

  try {
    // استخراج بيانات الرحلة من الطلب
    const travelData = req.body;

    // التحقق من وجود البيانات المطلوبة
    if (!travelData.destination) {
      return res.status(400).json({ message: 'الرجاء تحديد وجهة السفر' });
    }

    // الحصول على اقتراحات الأنشطة
    const activities = await getSuggestedActivities(travelData);
    
    // إرجاع اقتراحات الأنشطة
    return res.status(200).json({ activities });
  } catch (error) {
    console.error('Error in suggestActivities API:', error);
    
    // تحسين رسائل الخطأ
    let errorMessage = 'حدث خطأ أثناء الحصول على اقتراحات الأنشطة';
    
    if (error.message.includes('JSON')) {
      errorMessage = 'حدث خطأ في معالجة البيانات. يرجى المحاولة مرة أخرى.';
    } else if (error.message.includes('API')) {
      errorMessage = 'حدث خطأ في الاتصال بخدمة اقتراح الأنشطة. يرجى المحاولة مرة أخرى لاحقاً.';
    }
    
    return res.status(500).json({ message: errorMessage, error: error.message });
  }
}
