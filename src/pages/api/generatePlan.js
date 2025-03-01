import { createTravelPlan } from '../../utils/openaiService';

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
    
    if (!travelData.duration) {
      return res.status(400).json({ message: 'الرجاء تحديد مدة الرحلة' });
    }
    
    if (!travelData.budget) {
      return res.status(400).json({ message: 'الرجاء تحديد ميزانية الرحلة' });
    }
    
    if (!travelData.travelers) {
      return res.status(400).json({ message: 'الرجاء تحديد عدد المسافرين' });
    }

    // إنشاء خطة السفر باستخدام OpenAI
    const travelPlan = await createTravelPlan(travelData);
    
    // التحقق من صحة خطة السفر
    if (!travelPlan || !travelPlan.overview) {
      throw new Error('لم يتم إنشاء خطة سفر صالحة. يرجى المحاولة مرة أخرى.');
    }

    // إرجاع خطة السفر
    return res.status(200).json(travelPlan);
  } catch (error) {
    console.error('Error in generatePlan API:', error);
    
    // تحسين رسائل الخطأ
    let errorMessage = 'حدث خطأ أثناء إنشاء خطة السفر';
    
    if (error.message.includes('JSON')) {
      errorMessage = 'حدث خطأ في معالجة البيانات. يرجى المحاولة مرة أخرى.';
    } else if (error.message.includes('API')) {
      errorMessage = 'حدث خطأ في الاتصال بخدمة إنشاء خطط السفر. يرجى المحاولة مرة أخرى لاحقاً.';
    }
    
    return res.status(500).json({ 
      message: errorMessage,
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}
