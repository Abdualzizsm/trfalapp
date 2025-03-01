import { answerTravelQuestion } from '../../utils/openaiService';

export default async function handler(req, res) {
  // التحقق من طريقة الطلب
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'طريقة الطلب غير مدعومة' });
  }

  try {
    // استخراج السؤال وخطة السفر من الطلب
    const { question, travelPlan } = req.body;

    // التحقق من وجود السؤال
    if (!question) {
      return res.status(400).json({ message: 'الرجاء تقديم سؤال' });
    }

    // الحصول على إجابة للسؤال
    const answer = await answerTravelQuestion(question, travelPlan);
    
    // إرجاع الإجابة
    return res.status(200).json({ answer });
  } catch (error) {
    console.error('Error in answerQuestion API:', error);
    
    // تحسين رسائل الخطأ
    let errorMessage = 'حدث خطأ أثناء الإجابة على السؤال';
    
    if (error.message.includes('API')) {
      errorMessage = 'حدث خطأ في الاتصال بخدمة الإجابة على الأسئلة. يرجى المحاولة مرة أخرى لاحقاً.';
    }
    
    return res.status(500).json({ message: errorMessage, error: error.message });
  }
}
