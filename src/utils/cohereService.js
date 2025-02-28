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
 * @returns {Promise<Object>} - خطة السفر المنشأة بتنسيق JSON
 */
export async function createTravelPlan(travelData) {
  try {
    console.log("CohereService - Creating travel plan for:", travelData.destination);
    
    // حساب عدد الأيام
    const startDate = new Date(travelData.startDate);
    const endDate = new Date(travelData.endDate);
    const daysDifference = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
    
    // إنشاء نص الطلب
    const prompt = `أنت مخطط سفر محترف ومتخصص باللغة العربية. مهمتك إنشاء خطة سفر مفصلة وجذابة لـ ${travelData.destination}.

معلومات الرحلة:
- الوجهة: ${travelData.destination}
- المدة: ${daysDifference} أيام (${travelData.startDate} إلى ${travelData.endDate})
- عدد المسافرين: ${travelData.travelers}
- الميزانية: ${travelData.budget} دولار
- الاهتمامات: ${travelData.interests || 'غير محدد'}

أريد منك إنشاء خطة سفر كاملة بتنسيق JSON حسب الهيكل التالي بالضبط:

\`\`\`json
{
  "overview": {
    "title": "عنوان جذاب للرحلة",
    "description": "وصف موجز وجذاب للوجهة وما يميزها",
    "highlights": ["ميزة 1", "ميزة 2", "ميزة 3"],
    "bestTimeToVisit": "أفضل وقت للزيارة",
    "language": "اللغة المحلية",
    "currency": "العملة المحلية",
    "timeZone": "المنطقة الزمنية"
  },
  "accommodation": {
    "recommendations": [
      {
        "name": "اسم الفندق أو مكان الإقامة",
        "type": "نوع الإقامة (فندق فاخر، فندق متوسط، شقة، إلخ)",
        "priceRange": "نطاق السعر بالدولار",
        "location": "الموقع/المنطقة",
        "features": ["ميزة 1", "ميزة 2"],
        "description": "وصف موجز للإقامة"
      }
    ]
  },
  "dailyPlan": [
    {
      "day": 1,
      "title": "عنوان لليوم الأول",
      "description": "وصف موجز لخطة اليوم",
      "morning": {
        "activity": "النشاط الصباحي",
        "location": "الموقع",
        "description": "وصف النشاط",
        "cost": "التكلفة التقريبية"
      },
      "afternoon": {
        "activity": "النشاط المسائي",
        "location": "الموقع",
        "description": "وصف النشاط",
        "cost": "التكلفة التقريبية"
      },
      "evening": {
        "activity": "النشاط الليلي",
        "location": "الموقع",
        "description": "وصف النشاط",
        "cost": "التكلفة التقريبية"
      },
      "meals": {
        "breakfast": {
          "recommendation": "اسم المطعم أو نوع الطعام",
          "cost": "التكلفة التقريبية"
        },
        "lunch": {
          "recommendation": "اسم المطعم أو نوع الطعام",
          "cost": "التكلفة التقريبية"
        },
        "dinner": {
          "recommendation": "اسم المطعم أو نوع الطعام",
          "cost": "التكلفة التقريبية"
        }
      }
    }
  ],
  "restaurants": [
    {
      "name": "اسم المطعم",
      "cuisine": "نوع المطبخ",
      "priceRange": "نطاق السعر",
      "location": "الموقع",
      "specialDishes": ["طبق 1", "طبق 2"],
      "description": "وصف موجز للمطعم"
    }
  ],
  "budget": {
    "accommodation": {
      "amount": "المبلغ بالدولار",
      "percentage": "النسبة المئوية من إجمالي الميزانية"
    },
    "transportation": {
      "amount": "المبلغ بالدولار",
      "percentage": "النسبة المئوية من إجمالي الميزانية"
    },
    "food": {
      "amount": "المبلغ بالدولار",
      "percentage": "النسبة المئوية من إجمالي الميزانية"
    },
    "activities": {
      "amount": "المبلغ بالدولار",
      "percentage": "النسبة المئوية من إجمالي الميزانية"
    },
    "shopping": {
      "amount": "المبلغ بالدولار",
      "percentage": "النسبة المئوية من إجمالي الميزانية"
    },
    "emergency": {
      "amount": "المبلغ بالدولار",
      "percentage": "النسبة المئوية من إجمالي الميزانية"
    },
    "total": "إجمالي الميزانية المقدرة بالدولار"
  },
  "tips": [
    {
      "category": "الفئة (مثل: الأمان، الطعام، الثقافة، إلخ)",
      "title": "عنوان النصيحة",
      "description": "وصف النصيحة"
    }
  ],
  "attractions": [
    {
      "name": "اسم المعلم السياحي",
      "category": "الفئة (متحف، موقع طبيعي، معلم تاريخي، إلخ)",
      "location": "الموقع",
      "description": "وصف موجز",
      "entryFee": "رسوم الدخول",
      "bestTimeToVisit": "أفضل وقت للزيارة",
      "timeNeeded": "الوقت اللازم للزيارة"
    }
  ]
}
\`\`\`

ملاحظات مهمة:
1. يجب أن تكون جميع المعلومات باللغة العربية الفصحى.
2. يجب أن تكون المعلومات دقيقة وواقعية قدر الإمكان.
3. يجب أن تكون الخطة اليومية مناسبة لعدد الأيام المحدد (${daysDifference} أيام).
4. يجب أن تكون الميزانية المقترحة ضمن حدود الميزانية المحددة (${travelData.budget} دولار).
5. يجب أن تكون الخطة مناسبة لعدد المسافرين (${travelData.travelers} أشخاص).
6. قدم توصيات متنوعة للإقامة (3-4 خيارات) تناسب مختلف الميزانيات.
7. قدم على الأقل 5-7 نصائح مفيدة للسفر.
8. قدم على الأقل 5-7 معالم سياحية تستحق الزيارة.
9. تأكد من أن تنسيق JSON صحيح تمامًا وقابل للتحليل.

أريد فقط الرد بتنسيق JSON المطلوب، بدون أي نص إضافي قبله أو بعده.`;

    // استدعاء Cohere API
    const response = await cohere.generate({
      prompt: prompt,
      model: 'command',
      max_tokens: 4000,
      temperature: 0.7,
      k: 0,
      stop_sequences: [],
      return_likelihoods: 'NONE'
    });

    console.log("CohereService - Successfully generated travel plan");
    
    // استخراج النص المنشأ
    const generatedText = response.generations[0].text;
    console.log("Generated text from Cohere:", generatedText.substring(0, 200) + "...");
    
    // تحليل النص إلى كائن JSON
    try {
      // استخراج JSON من النص (في حالة وجود نص إضافي)
      const jsonMatch = generatedText.match(/```json\s*([\s\S]*?)\s*```/) || 
                        generatedText.match(/\{[\s\S]*\}/);
      
      let jsonString = jsonMatch ? jsonMatch[1] || jsonMatch[0] : generatedText;
      
      // تنظيف النص قبل التحليل
      jsonString = jsonString
        .replace(/,\s*}/g, '}')  // إزالة الفواصل الزائدة قبل الأقواس المغلقة
        .replace(/,\s*]/g, ']')  // إزالة الفواصل الزائدة قبل الأقواس المربعة المغلقة
        .replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2":')  // تأكد من أن جميع المفاتيح بين علامات اقتباس مزدوجة
        .replace(/:\s*(['"])([^'"]*?)(['"])\s*([,}])/g, ':"$2"$4')  // تأكد من أن جميع القيم النصية بين علامات اقتباس مزدوجة
        .replace(/:\s*'([^']*)'\s*([,}])/g, ':"$1"$2');  // تحويل علامات الاقتباس الفردية إلى مزدوجة
      
      console.log("Cleaned JSON string:", jsonString.substring(0, 200) + "...");
      
      // محاولة تحليل JSON
      let travelPlanObject;
      try {
        travelPlanObject = JSON.parse(jsonString);
      } catch (parseError) {
        console.error("First JSON parse error:", parseError);
        
        // محاولة إصلاح بعض الأخطاء الشائعة
        jsonString = jsonString
          .replace(/\n/g, ' ')  // إزالة أسطر جديدة
          .replace(/\r/g, ' ')  // إزالة أسطر جديدة
          .replace(/\t/g, ' ')  // إزالة علامات التبويب
          .replace(/\\/g, '\\\\')  // تهرب من الشرطة المائلة العكسية
          .replace(/"\s*:\s*"([^"]*?)"/g, (match, p1) => {
            // تهرب من علامات الاقتباس داخل القيم النصية
            return `":"${p1.replace(/"/g, '\\"')}"`;
          });
        
        // محاولة أخرى للتحليل
        try {
          travelPlanObject = JSON.parse(jsonString);
        } catch (secondParseError) {
          console.error("Second JSON parse error:", secondParseError);
          
          // إذا فشلت كل المحاولات، قم بإنشاء كائن JSON بسيط
          travelPlanObject = createFallbackTravelPlan(travelData, generatedText);
        }
      }
      
      return travelPlanObject;
    } catch (parseError) {
      console.error("Error parsing JSON:", parseError);
      console.log("Generated text:", generatedText);
      
      // إنشاء خطة سفر بسيطة في حالة الفشل
      return createFallbackTravelPlan(travelData, generatedText);
    }
    
  } catch (error) {
    console.error("Cohere API Error:", error);
    throw new Error(`فشل في إنشاء خطة السفر: ${error.message}`);
  }
}

function createFallbackTravelPlan(travelData, generatedText) {
  // إنشاء خطة سفر بسيطة في حالة الفشل
  return {
    overview: {
      title: `خطة سفر إلى ${travelData.destination}`,
      description: `وصف موجز لخطة السفر إلى ${travelData.destination}`,
      highlights: ["ميزة 1", "ميزة 2", "ميزة 3"],
      bestTimeToVisit: "أفضل وقت للزيارة",
      language: "اللغة المحلية",
      currency: "العملة المحلية",
      timeZone: "المنطقة الزمنية"
    },
    accommodation: {
      recommendations: [
        {
          name: "اسم الفندق أو مكان الإقامة",
          type: "نوع الإقامة (فندق فاخر، فندق متوسط، شقة، إلخ)",
          priceRange: "نطاق السعر بالدولار",
          location: "الموقع/المنطقة",
          features: ["ميزة 1", "ميزة 2"],
          description: "وصف موجز للإقامة"
        }
      ]
    },
    dailyPlan: [
      {
        day: 1,
        title: "عنوان لليوم الأول",
        description: "وصف موجز لخطة اليوم",
        morning: {
          activity: "النشاط الصباحي",
          location: "الموقع",
          description: "وصف النشاط",
          cost: "التكلفة التقريبية"
        },
        afternoon: {
          activity: "النشاط المسائي",
          location: "الموقع",
          description: "وصف النشاط",
          cost: "التكلفة التقريبية"
        },
        evening: {
          activity: "النشاط الليلي",
          location: "الموقع",
          description: "وصف النشاط",
          cost: "التكلفة التقريبية"
        },
        meals: {
          breakfast: {
            recommendation: "اسم المطعم أو نوع الطعام",
            cost: "التكلفة التقريبية"
          },
          lunch: {
            recommendation: "اسم المطعم أو نوع الطعام",
            cost: "التكلفة التقريبية"
          },
          dinner: {
            recommendation: "اسم المطعم أو نوع الطعام",
            cost: "التكلفة التقريبية"
          }
        }
      }
    ],
    restaurants: [
      {
        name: "اسم المطعم",
        cuisine: "نوع المطبخ",
        priceRange: "نطاق السعر",
        location: "الموقع",
        specialDishes: ["طبق 1", "طبق 2"],
        description: "وصف موجز للمطعم"
      }
    ],
    budget: {
      accommodation: {
        amount: "المبلغ بالدولار",
        percentage: "النسبة المئوية من إجمالي الميزانية"
      },
      transportation: {
        amount: "المبلغ بالدولار",
        percentage: "النسبة المئوية من إجمالي الميزانية"
      },
      food: {
        amount: "المبلغ بالدولار",
        percentage: "النسبة المئوية من إجمالي الميزانية"
      },
      activities: {
        amount: "المبلغ بالدولار",
        percentage: "النسبة المئوية من إجمالي الميزانية"
      },
      shopping: {
        amount: "المبلغ بالدولار",
        percentage: "النسبة المئوية من إجمالي الميزانية"
      },
      emergency: {
        amount: "المبلغ بالدولار",
        percentage: "النسبة المئوية من إجمالي الميزانية"
      },
      total: "إجمالي الميزانية المقدرة بالدولار"
    },
    tips: [
      {
        category: "الفئة (مثل: الأمان، الطعام، الثقافة، إلخ)",
        title: "عنوان النصيحة",
        description: "وصف النصيحة"
      }
    ],
    attractions: [
      {
        name: "اسم المعلم السياحي",
        category: "الفئة (متحف، موقع طبيعي، معلم تاريخي، إلخ)",
        location: "الموقع",
        description: "وصف موجز",
        entryFee: "رسوم الدخول",
        bestTimeToVisit: "أفضل وقت للزيارة",
        timeNeeded: "الوقت اللازم للزيارة"
      }
    ]
  };
}
