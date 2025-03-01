import { CohereClient } from 'cohere-ai';

/**
 * إنشاء خطة سفر باستخدام Cohere API
 * @param {Object} travelData - بيانات الرحلة
 * @returns {Promise<Object>} - كائن خطة السفر
 */
export async function createTravelPlan(travelData) {
  try {
    // التحقق من وجود مفتاح API
    if (!process.env.COHERE_API_KEY) {
      throw new Error('مفتاح Cohere API غير موجود');
    }

    // إنشاء عميل Cohere
    const cohere = new CohereClient({
      token: process.env.COHERE_API_KEY,
    });

    // إنشاء نص التوجيه
    const prompt = `أريد منك إنشاء خطة سفر كاملة بتنسيق JSON حسب الهيكل التالي بالضبط:
    {
      "overview": {
        "title": "عنوان خطة السفر",
        "description": "وصف موجز للوجهة والخطة",
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

    أنا أخطط لرحلة إلى ${travelData.destination} لمدة ${travelData.duration} أيام بميزانية ${travelData.budget} دولار. سأسافر مع ${travelData.travelers} أشخاص من تاريخ ${travelData.startDate} إلى ${travelData.endDate}.

    أريد خطة سفر مفصلة باللغة العربية تتضمن:
    1. نظرة عامة على الوجهة
    2. توصيات للإقامة
    3. خطة يومية مفصلة لكل يوم من أيام الرحلة
    4. توصيات للمطاعم
    5. تقدير للميزانية وتوزيعها
    6. نصائح سفر مفيدة
    7. أهم المعالم السياحية

    يرجى تقديم المعلومات بتنسيق JSON بالضبط كما هو موضح أعلاه، مع الالتزام بالهيكل المحدد. تأكد من أن الخطة اليومية تغطي جميع أيام الرحلة (${travelData.duration} أيام).
    
    ملاحظة مهمة: قم بإنشاء JSON صالح بدون أخطاء في التنسيق. تأكد من أن جميع المفاتيح والقيم محاطة بعلامات اقتباس مزدوجة، وأن الفواصل موضوعة بشكل صحيح.`;

    // استدعاء Cohere API
    const response = await cohere.generate({
      prompt: prompt,
      model: 'command',
      maxTokens: 4000,
      temperature: 0.7,
      k: 0,
      stopSequences: [],
      returnLikelihoods: 'NONE',
    });
    
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
    console.error('Error creating travel plan:', error);
    throw new Error(`فشل في إنشاء خطة السفر: ${error.message}`);
  }
}

/**
 * إنشاء خطة سفر بديلة في حالة فشل تحليل JSON
 * @param {Object} travelData - بيانات الرحلة
 * @param {string} generatedText - النص المنشأ
 * @returns {Object} - كائن خطة السفر البديلة
 */
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
    dailyPlan: Array.from({ length: parseInt(travelData.duration) || 1 }, (_, i) => ({
      day: i + 1,
      title: `اليوم ${i + 1} في ${travelData.destination}`,
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
    })),
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
    ],
    rawText: generatedText
  };
}
