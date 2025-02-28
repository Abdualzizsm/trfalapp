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
    const prompt = `أنت مخطط سفر محترف ومتخصص. يرجى إنشاء خطة سفر مفصلة وشاملة باللغة العربية الفصحى فقط (لا تستخدم أي لغة أخرى) لـ ${travelData.destination} بناءً على المعلومات التالية:
    
    - الوجهة: ${travelData.destination}
    - تاريخ البدء: ${travelData.startDate}
    - تاريخ الانتهاء: ${travelData.endDate}
    - عدد المسافرين: ${travelData.travelers}
    - الميزانية: ${travelData.budget}
    - الاهتمامات: ${travelData.interests || 'غير محدد'}
    - نوع الإقامة: ${travelData.accommodation || 'غير محدد'}
    - وسيلة النقل: ${travelData.transportation || 'غير محدد'}
    
    يجب أن تتضمن الخطة العناصر التالية بشكل مفصل وواضح وباللغة العربية فقط:
    
    ## 1. نظرة عامة على الوجهة
    قدم وصفًا شاملًا للوجهة يتضمن معلومات عن الثقافة والمناخ وأفضل وقت للزيارة.
    
    ## 2. تفاصيل الإقامة
    اقترح 3-4 خيارات للإقامة تناسب الميزانية المحددة، مع ذكر الأسعار التقريبية والمميزات والموقع لكل خيار.
    
    ## 3. جدول يومي مفصل للأنشطة
    قم بإنشاء جدول يومي مفصل لكل يوم من أيام الرحلة يتضمن:
    - الأنشطة الصباحية
    - الأنشطة المسائية
    - اقتراحات للمطاعم والوجبات
    - أوقات الراحة
    - التكلفة التقريبية لكل نشاط
    
    ## 4. توصيات للمطاعم
    اقترح قائمة بأفضل المطاعم المحلية والعالمية، مع ذكر نوع الطعام والأسعار التقريبية والأطباق المميزة.
    
    ## 5. تقدير تفصيلي للتكاليف
    قدم تقديرًا تفصيليًا للتكاليف يشمل:
    - تكلفة الإقامة
    - تكلفة المواصلات الداخلية
    - تكلفة الطعام والشراب
    - تكلفة الأنشطة والمعالم السياحية
    - المصروفات المتنوعة
    - نسبة احتياطية للطوارئ
    
    ## 6. نصائح مهمة للسفر
    قدم نصائح مفيدة حول:
    - العملة المحلية وأفضل طرق الدفع
    - الملابس المناسبة للمناخ
    - العادات والتقاليد المحلية
    - متطلبات التأشيرة والسفر
    - نصائح للسلامة والأمان
    - كلمات وعبارات مفيدة باللغة المحلية
    
    ## 7. أماكن تستحق الزيارة
    قائمة بأهم المعالم والأماكن التي تستحق الزيارة مع وصف موجز لكل منها وأوقات الزيارة المثالية.
    
    استخدم تنسيقًا واضحًا مع عناوين رئيسية وفرعية، وقم بتنظيم المعلومات بطريقة سهلة القراءة. استخدم النقاط والقوائم حيثما أمكن لتحسين قابلية القراءة.
    
    ملاحظة مهمة: يجب أن تكون الخطة بالكامل باللغة العربية فقط. لا تستخدم أي كلمات أو عبارات باللغة الإنجليزية أو أي لغة أخرى.`;

    // استدعاء Cohere API
    const response = await cohere.generate({
      prompt: prompt,
      model: 'command',
      max_tokens: 3000,
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
