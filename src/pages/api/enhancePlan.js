import { enhanceTravelPlan } from '../../utils/openaiService';

export default async function handler(req, res) {
  // التحقق من طريقة الطلب
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'طريقة الطلب غير مدعومة' });
  }

  try {
    // استخراج خطة السفر من الطلب
    const travelPlan = req.body;

    // التحقق من صحة خطة السفر
    if (!travelPlan || !travelPlan.overview) {
      return res.status(400).json({ message: 'الرجاء تقديم خطة سفر صالحة' });
    }

    // تحسين خطة السفر باستخدام OpenAI
    const enhancedPlan = await enhanceTravelPlan(travelPlan);
    
    // التحقق من صحة خطة السفر المحسنة
    if (!enhancedPlan || !enhancedPlan.overview) {
      throw new Error('لم يتم تحسين خطة السفر بشكل صحيح. يرجى المحاولة مرة أخرى.');
    }

    // إرجاع خطة السفر المحسنة
    return res.status(200).json(enhancedPlan);
  } catch (error) {
    console.error('Error in enhancePlan API:', error);
    
    // تحسين رسائل الخطأ
    let errorMessage = 'حدث خطأ أثناء تحسين خطة السفر';
    
    if (error.message.includes('JSON')) {
      errorMessage = 'حدث خطأ في معالجة البيانات. يرجى المحاولة مرة أخرى.';
    } else if (error.message.includes('API')) {
      errorMessage = 'حدث خطأ في الاتصال بخدمة تحسين خطط السفر. يرجى المحاولة مرة أخرى لاحقاً.';
    }
    
    return res.status(500).json({ message: errorMessage, error: error.message });
  }
}
