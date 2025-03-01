import { createTravelPlan } from '../../utils/cohereService';

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

    // إنشاء خطة السفر
    const travelPlan = await createTravelPlan(travelData);

    // إرجاع خطة السفر
    return res.status(200).json(travelPlan);
  } catch (error) {
    console.error('Error in generatePlan API:', error);
    return res.status(500).json({ message: error.message || 'حدث خطأ أثناء إنشاء خطة السفر' });
  }
}
