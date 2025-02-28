import { CohereClient } from 'cohere-ai';

// تهيئة API بمفتاح API المخزن
const apiKey = process.env.COHERE_API_KEY || "CBIg4QiOWYIcybjT2Ak6RLaIXmFWi225VenalM9j";
console.log("CohereService - Using API Key:", apiKey ? (apiKey.substring(0, 5) + "...") : "Not provided");

// إنشاء عميل Cohere
const cohere = new CohereClient({ 
  token: apiKey,
});

/**
 * دالة لإنشاء خطة سفر باستخدام Cohere API
 * @param {Object} travelData - بيانات الرحلة (الوجهة، الميزانية، التواريخ، إلخ)
 * @returns {Promise<string>} - خطة السفر المنشأة
 */
export async function createTravelPlan(travelData) {
  try {
    console.log("CohereService - Creating travel plan for:", travelData.destination);
    
    // إنشاء نص الطلب
    const prompt = `أنت مخطط سفر محترف. يرجى إنشاء خطة سفر مفصلة لـ ${travelData.destination} بناءً على المعلومات التالية:
    
    - الوجهة: ${travelData.destination}
    - تاريخ البدء: ${travelData.startDate}
    - تاريخ الانتهاء: ${travelData.endDate}
    - عدد المسافرين: ${travelData.travelers}
    - الميزانية: ${travelData.budget}
    - الاهتمامات: ${travelData.interests || 'غير محدد'}
    - نوع الإقامة: ${travelData.accommodation || 'غير محدد'}
    - وسيلة النقل: ${travelData.transportation || 'غير محدد'}
    
    يجب أن تتضمن الخطة:
    1. نظرة عامة على الوجهة
    2. جدول يومي مفصل للأنشطة
    3. توصيات للمطاعم
    4. توصيات للإقامة
    5. نصائح للسفر
    6. تقدير التكاليف
    
    قم بتنظيم الخطة بشكل واضح مع العناوين والأقسام.`;

    // استدعاء Cohere API
    const response = await cohere.generate({
      prompt: prompt,
      model: 'command',
      max_tokens: 2000,
      temperature: 0.7,
      k: 0,
      stop_sequences: [],
      return_likelihoods: 'NONE'
    });

    console.log("CohereService - Successfully generated travel plan");
    
    // استخراج النص المنشأ
    const generatedText = response.generations[0].text;
    return generatedText;
    
  } catch (error) {
    console.error("Cohere API Error:", error);
    throw new Error(`فشل في إنشاء خطة السفر: ${error.message}`);
  }
}
