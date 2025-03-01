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
    
    // محاولة تحليل النص إلى كائن JSON
    try {
      // استخراج JSON من النص (في حالة وجود نص إضافي)
      const jsonMatch = generatedText.match(/```json\s*([\s\S]*?)\s*```/) || 
                        generatedText.match(/```\s*([\s\S]*?)\s*```/) ||
                        generatedText.match(/\{[\s\S]*\}/);
      
      // إذا لم يتم العثور على JSON في النص، استخدم النسخة الاحتياطية مباشرة
      if (!jsonMatch) {
        console.log("No JSON found in the generated text, using fallback plan");
        return createFallbackTravelPlan(travelData, generatedText);
      }
      
      let jsonString = jsonMatch ? jsonMatch[1] || jsonMatch[0] : generatedText;
      
      // تنظيف النص قبل التحليل
      jsonString = jsonString
        .replace(/,\s*}/g, '}')  // إزالة الفواصل الزائدة قبل الأقواس المغلقة
        .replace(/,\s*]/g, ']')  // إزالة الفواصل الزائدة قبل الأقواس المربعة المغلقة
        .replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2":')  // تأكد من أن جميع المفاتيح بين علامات اقتباس مزدوجة
        .replace(/:\s*(['"])([^'"]*?)(['"])\s*([,}])/g, ':"$2"$4')  // تأكد من أن جميع القيم النصية بين علامات اقتباس مزدوجة
        .replace(/:\s*'([^']*)'\s*([,}])/g, ':"$1"$2')  // تحويل علامات الاقتباس الفردية إلى مزدوجة
        .replace(/\n/g, ' ')  // إزالة أسطر جديدة
        .replace(/\r/g, ' ')  // إزالة أسطر جديدة
        .replace(/\t/g, ' ')  // إزالة علامات التبويب
        .replace(/\\/g, '\\\\');  // تهرب من الشرطة المائلة العكسية
      
      console.log("Cleaned JSON string:", jsonString.substring(0, 200) + "...");
      
      // التحقق من وجود JSON صالح
      if (!jsonString.includes('"overview"') || !jsonString.includes('"dailyPlan"')) {
        console.log("JSON string does not contain required fields, using fallback plan");
        return createFallbackTravelPlan(travelData, generatedText);
      }
      
      // محاولة تحليل JSON
      try {
        // تأكد من أن النص يبدأ وينتهي بأقواس صحيحة
        if (!jsonString.trim().startsWith('{')) {
          jsonString = '{' + jsonString.substring(jsonString.indexOf('"overview"'));
        }
        if (!jsonString.trim().endsWith('}')) {
          jsonString = jsonString.substring(0, jsonString.lastIndexOf('}') + 1);
        }
        
        const travelPlanObject = JSON.parse(jsonString);
        
        // التحقق من وجود الحقول المطلوبة
        if (!travelPlanObject.overview || !travelPlanObject.dailyPlan) {
          console.log("Parsed JSON is missing required fields, using fallback plan");
          return createFallbackTravelPlan(travelData, generatedText);
        }
        
        return travelPlanObject;
      } catch (parseError) {
        console.error("JSON parse error:", parseError);
        console.log("Using fallback travel plan");
        return createFallbackTravelPlan(travelData, generatedText);
      }
    } catch (error) {
      console.error("Error parsing JSON:", error);
      console.log("Using fallback travel plan");
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
  const destination = travelData.destination || 'الوجهة';
  const duration = parseInt(travelData.duration) || 3;
  const budget = travelData.budget || '1000';
  const travelers = travelData.travelers || '2';
  
  // إنشاء خطة سفر واقعية
  return {
    overview: {
      title: `خطة سفر إلى ${destination} لمدة ${duration} أيام`,
      description: `خطة سفر مخصصة إلى ${destination} لمدة ${duration} أيام لـ ${travelers} مسافرين. تشمل الخطة أماكن الإقامة، الأنشطة اليومية، المطاعم الموصى بها، وتقدير للميزانية.`,
      highlights: [
        `استكشاف معالم ${destination} الشهيرة`,
        "تجربة المأكولات المحلية الشهية",
        "الاستمتاع بتجارب ثقافية فريدة"
      ],
      bestTimeToVisit: "يعتمد على الوجهة والموسم",
      language: "اللغة المحلية للوجهة",
      currency: "العملة المحلية للوجهة",
      timeZone: "المنطقة الزمنية للوجهة"
    },
    accommodation: {
      recommendations: [
        {
          name: `فندق ${destination} الفاخر`,
          type: "فندق فاخر",
          priceRange: "200-300 دولار في الليلة",
          location: "وسط المدينة",
          features: ["مسبح", "إطلالة رائعة", "خدمة الغرف"],
          description: "فندق فاخر يقع في قلب المدينة، يوفر إطلالات رائعة وخدمات ممتازة"
        },
        {
          name: `شقة ${destination} الحديثة`,
          type: "شقة",
          priceRange: "100-150 دولار في الليلة",
          location: "منطقة سكنية هادئة",
          features: ["مطبخ كامل", "واي فاي مجاني", "غرفتي نوم"],
          description: "شقة عصرية مريحة توفر تجربة إقامة محلية أصيلة"
        }
      ]
    },
    dailyPlan: Array.from({ length: duration }, (_, i) => ({
      day: i + 1,
      title: `اليوم ${i + 1} - ${i === 0 ? 'استكشاف المعالم الرئيسية' : i === duration - 1 ? 'الاستمتاع بآخر يوم' : `استكشاف ${destination}`}`,
      description: `خطة اليوم ${i + 1} من رحلتك إلى ${destination}، تشمل أنشطة متنوعة ومطاعم مميزة`,
      morning: {
        activity: i === 0 ? "زيارة المعالم السياحية الرئيسية" : `استكشاف منطقة ${i + 1}`,
        location: "وسط المدينة",
        description: "استكشاف المعالم السياحية الشهيرة والتقاط الصور التذكارية",
        cost: "30-50 دولار للشخص"
      },
      afternoon: {
        activity: "تناول الغداء وزيارة المتاحف",
        location: "المنطقة الثقافية",
        description: "زيارة المتاحف المحلية والتعرف على تاريخ وثقافة المنطقة",
        cost: "40-60 دولار للشخص"
      },
      evening: {
        activity: "عشاء وجولة ليلية",
        location: "منطقة الترفيه",
        description: "الاستمتاع بالأجواء الليلية والترفيه المحلي",
        cost: "50-70 دولار للشخص"
      },
      meals: {
        breakfast: {
          recommendation: "مقهى محلي",
          cost: "10-15 دولار للشخص"
        },
        lunch: {
          recommendation: "مطعم تقليدي",
          cost: "20-30 دولار للشخص"
        },
        dinner: {
          recommendation: "مطعم راقي",
          cost: "30-50 دولار للشخص"
        }
      }
    })),
    restaurants: [
      {
        name: `مطعم ${destination} التقليدي`,
        cuisine: "المطبخ المحلي",
        priceRange: "متوسط",
        location: "وسط المدينة",
        specialDishes: ["طبق محلي شهير 1", "طبق محلي شهير 2"],
        description: "مطعم يقدم أشهى الأطباق المحلية التقليدية بأجواء أصيلة"
      },
      {
        name: `مطعم ${destination} العالمي`,
        cuisine: "عالمي",
        priceRange: "مرتفع",
        location: "المنطقة السياحية",
        specialDishes: ["طبق عالمي شهير 1", "طبق عالمي شهير 2"],
        description: "مطعم راقي يقدم مزيجاً من الأطباق العالمية والمحلية"
      }
    ],
    budget: {
      accommodation: {
        amount: `${Math.round(parseInt(budget) * 0.4)} دولار`,
        percentage: "40%"
      },
      transportation: {
        amount: `${Math.round(parseInt(budget) * 0.15)} دولار`,
        percentage: "15%"
      },
      food: {
        amount: `${Math.round(parseInt(budget) * 0.25)} دولار`,
        percentage: "25%"
      },
      activities: {
        amount: `${Math.round(parseInt(budget) * 0.1)} دولار`,
        percentage: "10%"
      },
      shopping: {
        amount: `${Math.round(parseInt(budget) * 0.05)} دولار`,
        percentage: "5%"
      },
      emergency: {
        amount: `${Math.round(parseInt(budget) * 0.05)} دولار`,
        percentage: "5%"
      },
      total: `${budget} دولار`
    },
    tips: [
      {
        category: "الأمان",
        title: "احتفظ بنسخة من جواز سفرك",
        description: "احتفظ دائماً بنسخة من جواز سفرك ووثائق السفر الهامة في مكان منفصل عن الأصل"
      },
      {
        category: "الثقافة",
        title: "احترم العادات المحلية",
        description: "تعرف على العادات والتقاليد المحلية واحترمها أثناء زيارتك"
      },
      {
        category: "النقل",
        title: "استخدم وسائل النقل العام",
        description: "وسائل النقل العام غالباً ما تكون أرخص وأسرع للتنقل داخل المدينة"
      }
    ],
    attractions: [
      {
        name: `معلم ${destination} الشهير 1`,
        category: "معلم تاريخي",
        location: "وسط المدينة",
        description: "من أشهر المعالم التاريخية في المنطقة",
        entryFee: "15-20 دولار للشخص",
        bestTimeToVisit: "الصباح الباكر لتجنب الازدحام",
        timeNeeded: "2-3 ساعات"
      },
      {
        name: `معلم ${destination} الشهير 2`,
        category: "موقع طبيعي",
        location: "خارج المدينة",
        description: "منظر طبيعي خلاب يستحق الزيارة",
        entryFee: "10-15 دولار للشخص",
        bestTimeToVisit: "وقت الغروب للحصول على أفضل إطلالة",
        timeNeeded: "3-4 ساعات"
      }
    ]
  };
}
