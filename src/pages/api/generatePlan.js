import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const travelData = req.body;
    console.log("Received travel data:", travelData);
    
    // التحقق من وجود البيانات المطلوبة
    if (!travelData.destination || !travelData.budget || !travelData.startDate || !travelData.endDate) {
      return res.status(400).json({ error: 'Missing required travel data' });
    }
    
    // تهيئة API باستخدام مفتاح API
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      console.error("GEMINI_API_KEY is not set in environment variables");
      return res.status(500).json({ error: 'API key not configured' });
    }
    
    console.log("Using API Key:", apiKey ? (apiKey.substring(0, 5) + "...") : "Not provided");
    
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // استخدام نموذج Gemini Pro
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    console.log("Using model: gemini-pro");
    
    // إعداد النص التوجيهي (prompt)
    const prompt = `
      أنشئ خطة سفر تفصيلية ومميزة للرحلة التالية:
      
      الوجهة: ${travelData.destination}
      الميزانية: ${travelData.budget} ${travelData.currency || 'دولار'}
      تاريخ السفر: من ${travelData.startDate} إلى ${travelData.endDate}
      عدد المسافرين: ${travelData.travelers} ${travelData.travelers > 1 ? 'أشخاص' : 'شخص'}
      نوع الرحلة: ${travelData.tripType}
      ${travelData.additionalRequirements ? `متطلبات إضافية: ${travelData.additionalRequirements}` : ''}
      
      قم بتنظيم الخطة على الشكل التالي:
      
      1. ملخص الرحلة: وصف موجز للوجهة وأبرز معالم الرحلة.
      
      2. تفاصيل الإقامة: اقتراحات لأماكن إقامة تناسب الميزانية ونوع الرحلة مع أسعار تقريبية.
      
      3. خطة يومية مفصلة:
         - اليوم الأول: [التاريخ]
           * الصباح: أنشطة وأماكن للزيارة مع التكلفة التقريبية والتوقيت المناسب
           * الظهيرة: أنشطة واقتراحات لتناول الطعام مع التكلفة التقريبية
           * المساء: أنشطة وفعاليات مسائية مع التكلفة التقريبية
           
         (تابع نفس النمط لكل يوم من أيام الرحلة)
      
      4. توزيع الميزانية: كيفية توزيع الميزانية على عناصر الرحلة المختلفة (الإقامة، المواصلات، الطعام، الأنشطة).
      
      5. نصائح مفيدة: معلومات خاصة عن الوجهة، عادات محلية، طقس متوقع، وكلمات مفيدة باللغة المحلية.
      
      6. بدائل: اقتراحات بديلة في حال رغب المسافرون في تغيير بعض العناصر.
      
      ملاحظات مهمة:
      - تأكد من مراعاة الميزانية المحددة في جميع الاقتراحات.
      - قدم خيارات تناسب نوع الرحلة المذكور (رومانسية، عائلية، مع أصدقاء، إلخ).
      - اقترح أنشطة متنوعة تغطي الجوانب الثقافية والترفيهية والتجارب المميزة للوجهة.
      - يجب أن تكون التكاليف واقعية ومناسبة لمستوى الأسعار في البلد المقصود.
    `;
    
    console.log("Sending prompt to Gemini API...");
    
    // توليد المحتوى
    try {
      const result = await model.generateContent(prompt);
      const response = result.response.text();
      console.log("Received response from Gemini API");
      
      return res.status(200).json({ plan: response });
    } catch (apiError) {
      console.error("Gemini API Error:", apiError);
      return res.status(500).json({ 
        error: `Error from Gemini API: ${apiError.message}`,
        details: apiError
      });
    }
  } catch (error) {
    console.error('Error generating travel plan:', error);
    return res.status(500).json({ 
      error: `Failed to generate travel plan: ${error.message}`,
      stack: error.stack
    });
  }
}
