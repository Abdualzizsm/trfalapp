import { GoogleGenerativeAI } from "@google/generative-ai";

// تهيئة API بمفتاح API المخزن 
const apiKey = process.env.GEMINI_API_KEY;
console.log("GeminiService - Using API Key:", apiKey ? (apiKey.substring(0, 5) + "...") : "Not provided");

if (!apiKey) {
  console.error("GEMINI_API_KEY is not set in environment variables");
}

const genAI = new GoogleGenerativeAI(apiKey);

// الحصول على نموذج Gemini Pro
const model = genAI.getGenerativeModel({ model: "gemini-pro" });
console.log("GeminiService - Using model: gemini-pro");

/**
 * دالة لإنشاء خطة سفر باستخدام Gemini API
 * @param {Object} travelData - بيانات الرحلة (الوجهة، الميزانية، التواريخ، إلخ)
 * @returns {Promise<string>} - خطة السفر المنشأة
 */
export async function createTravelPlan(travelData) {
  try {
    console.log("GeminiService - Creating travel plan for:", travelData.destination);
    
    // إعداد النص التوجيهي (prompt) للنموذج
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
    
    console.log("GeminiService - Sending prompt to Gemini API...");
    
    // توليد المحتوى باستخدام Gemini
    const result = await model.generateContent(prompt);
    console.log("GeminiService - Received response from Gemini API");
    
    return result.response.text();
  } catch (error) {
    console.error("GeminiService - Error using Gemini API:", error);
    throw new Error(`حدث خطأ أثناء إنشاء خطة السفر: ${error.message}`);
  }
}
