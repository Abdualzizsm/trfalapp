import OpenAI from "openai";

/**
 * إنشاء عميل OpenAI
 * @returns {OpenAI} - عميل OpenAI
 */
function createOpenAIClient() {
  try {
    // التحقق من وجود مفتاح API
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY.startsWith('sk_test') || process.env.OPENAI_API_KEY.startsWith('ghp_')) {
      console.warn('مفتاح OpenAI API غير موجود أو غير صالح. سيتم استخدام بيانات وهمية للاختبار.');
      return null;
    }

    // إنشاء عميل OpenAI
    return new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
  } catch (error) {
    console.error('خطأ في إنشاء عميل OpenAI:', error);
    return null;
  }
}

// بيانات وهمية للاختبار المحلي
function getMockTravelPlan(destination) {
  return {
    destination: destination || "دبي",
    duration: 5,
    budget: "متوسط",
    interests: ["تسوق", "ثقافة", "طعام"],
    accommodation: {
      type: "فندق",
      name: "فندق برج العرب",
      description: "فندق فاخر على شاطئ البحر",
      price: "مرتفع"
    },
    dailyPlans: [
      {
        day: 1,
        activities: [
          {
            name: "زيارة برج خليفة",
            description: "استمتع بإطلالة رائعة من أعلى برج في العالم",
            time: "صباحًا",
            cost: "متوسط",
            location: "وسط مدينة دبي"
          },
          {
            name: "التسوق في دبي مول",
            description: "أكبر مركز تسوق في العالم مع مجموعة متنوعة من المتاجر",
            time: "بعد الظهر",
            cost: "متغير",
            location: "وسط مدينة دبي"
          },
          {
            name: "عشاء في مطعم البرج",
            description: "تناول العشاء مع إطلالة على نافورة دبي",
            time: "مساءً",
            cost: "مرتفع",
            location: "وسط مدينة دبي"
          }
        ]
      },
      {
        day: 2,
        activities: [
          {
            name: "سفاري الصحراء",
            description: "مغامرة في الصحراء مع ركوب الجمال وعروض ثقافية",
            time: "يوم كامل",
            cost: "متوسط",
            location: "صحراء دبي"
          }
        ]
      },
      {
        day: 3,
        activities: [
          {
            name: "زيارة المدينة القديمة",
            description: "استكشاف سوق الذهب والتوابل والمعالم التاريخية",
            time: "صباحًا",
            cost: "منخفض",
            location: "ديرة، دبي"
          },
          {
            name: "رحلة بحرية في خور دبي",
            description: "رحلة تقليدية في قارب العبرة لمشاهدة معالم دبي من الماء",
            time: "بعد الظهر",
            cost: "منخفض",
            location: "خور دبي"
          }
        ]
      },
      {
        day: 4,
        activities: [
          {
            name: "زيارة جزيرة النخلة",
            description: "استكشاف جزيرة النخلة الاصطناعية الشهيرة",
            time: "صباحًا",
            cost: "متوسط",
            location: "جزيرة النخلة، دبي"
          },
          {
            name: "زيارة أكواريوم دبي",
            description: "أحد أكبر أحواض السمك في العالم",
            time: "بعد الظهر",
            cost: "متوسط",
            location: "دبي مول"
          }
        ]
      },
      {
        day: 5,
        activities: [
          {
            name: "يوم في حديقة الألعاب المائية",
            description: "الاستمتاع بالألعاب المائية المثيرة",
            time: "يوم كامل",
            cost: "متوسط",
            location: "حديقة وايلد وادي المائية"
          }
        ]
      }
    ],
    transportation: {
      type: "سيارة أجرة ومترو",
      cost: "متوسط",
      notes: "يمكن استخدام تطبيقات طلب سيارات الأجرة مثل أوبر وكريم"
    },
    tips: [
      "احرص على ارتداء ملابس محتشمة عند زيارة الأماكن العامة",
      "الطقس حار جدًا في الصيف، لذا يفضل زيارة دبي في فصل الشتاء",
      "يمكن شراء بطاقة دبي السياحية للحصول على خصومات على المعالم السياحية"
    ]
  };
}

/**
 * إنشاء خطة سفر باستخدام OpenAI API
 * @param {Object} travelData - بيانات الرحلة
 * @returns {Promise<Object>} - خطة السفر
 */
export async function createTravelPlan(travelData) {
  const openai = createOpenAIClient();
  
  // إذا كان عميل OpenAI غير متوفر، استخدم بيانات وهمية للاختبار
  if (!openai) {
    console.log('استخدام بيانات وهمية لخطة السفر');
    return generateMockTravelPlan(travelData);
  }

  try {
    // إنشاء نص التوجيه
    const prompt = `أريد منك إنشاء خطة سفر كاملة بتنسيق JSON حسب الهيكل التالي بالضبط:
{
  "overview": {
    "title": "عنوان خطة السفر",
    "description": "وصف موجز للرحلة",
    "highlights": ["ميزة 1", "ميزة 2", "ميزة 3"],
    "bestTimeToVisit": "أفضل وقت للزيارة",
    "language": "اللغة المحلية",
    "currency": "العملة المحلية",
    "timeZone": "المنطقة الزمنية",
    "travelTips": ["نصيحة 1", "نصيحة 2", "نصيحة 3"],
    "safetyInfo": "معلومات الأمان",
    "localCustoms": "العادات المحلية",
    "packingList": ["عنصر 1", "عنصر 2", "عنصر 3"]
  },
  "accommodations": [
    {
      "name": "اسم الفندق أو مكان الإقامة",
      "type": "نوع الإقامة (فندق فاخر، فندق متوسط، شقة، إلخ)",
      "priceRange": "نطاق السعر بالدولار",
      "location": "الموقع/المنطقة",
      "features": ["ميزة 1", "ميزة 2"],
      "description": "وصف موجز للإقامة"
    }
  ],
  "dailyPlan": [
    {
      "day": 1,
      "title": "عنوان اليوم الأول",
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
    "other": {
      "amount": "المبلغ بالدولار",
      "percentage": "النسبة المئوية من إجمالي الميزانية"
    },
    "total": "إجمالي الميزانية بالدولار"
  },
  "transportation": {
    "options": [
      {
        "type": "نوع وسيلة النقل",
        "cost": "التكلفة التقريبية",
        "description": "وصف وسيلة النقل",
        "recommendedFor": "موصى به لـ",
        "tips": "نصائح حول وسيلة النقل"
      }
    ]
  }
}

بناءً على بيانات الرحلة التالية:
- الوجهة: ${travelData.destination}
- المدة: ${travelData.duration} أيام
- الميزانية: ${travelData.budget}
- عدد المسافرين: ${travelData.travelers}
- نوع الرحلة: ${travelData.tripType || 'سياحة عامة'}
- الاهتمامات: ${travelData.interests ? travelData.interests.join(', ') : 'غير محدد'}

ملاحظات مهمة:
1. يجب أن تكون الخطة اليومية مناسبة لعدد أيام الرحلة المحددة (${travelData.duration} أيام).
2. يجب أن تكون الميزانية والتكاليف متناسبة مع الميزانية المحددة (${travelData.budget}).
3. يجب أن تكون الأنشطة والمعالم مناسبة للوجهة (${travelData.destination}).
4. قم بتضمين معلومات واقعية ودقيقة عن الوجهة.
5. أعد الخطة بتنسيق JSON فقط، بدون أي نص إضافي.`;

    // استدعاء OpenAI API
    const response = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "أنت مخطط سفر متخصص يقدم خطط سفر مفصلة ومخصصة بتنسيق JSON." },
        { role: "user", content: prompt }
      ],
      model: "gpt-4o-mini",
      temperature: 0.7,
      max_tokens: 4096,
      top_p: 1
    });
    
    // استخراج النص المنشأ
    const generatedText = response.choices[0].message.content;
    console.log("Generated travel plan from OpenAI:", generatedText.substring(0, 200) + "...");
    
    // محاولة تحليل النص إلى كائن JSON
    try {
      // استخراج JSON من النص (في حالة وجود نص إضافي)
      const jsonMatch = generatedText.match(/```json\s*([\s\S]*?)\s*```/) || 
                        generatedText.match(/```\s*([\s\S]*?)\s*```/) ||
                        generatedText.match(/\{[\s\S]*\}/);
      
      // إذا لم يتم العثور على JSON في النص، حاول تحليل النص كاملاً
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
      
      // محاولة تحليل JSON
      const travelPlan = JSON.parse(jsonString);
      
      // التحقق من صحة خطة السفر
      if (!travelPlan || !travelPlan.overview) {
        throw new Error('لم يتم إنشاء خطة سفر صالحة');
      }
      
      return travelPlan;
    } catch (jsonError) {
      console.error("Error parsing JSON from OpenAI response:", jsonError);
      throw new Error('حدث خطأ في معالجة استجابة OpenAI: ' + jsonError.message);
    }
  } catch (error) {
    console.error("Error creating travel plan with OpenAI:", error);
    // في حالة الخطأ، استخدم البيانات الوهمية
    return generateMockTravelPlan(travelData);
  }
}

// توليد بيانات وهمية لخطة السفر للاختبار
function generateMockTravelPlan(travelData) {
  return {
    destination: travelData.destination,
    duration: travelData.duration || 7,
    startDate: travelData.startDate,
    endDate: travelData.endDate,
    travelers: travelData.travelers,
    budget: travelData.budget,
    overview: {
      description: `رحلة رائعة إلى ${travelData.destination} لمدة ${travelData.duration || 7} أيام. هذه بيانات تجريبية نظرًا لعدم وجود مفتاح OpenAI API صالح.`,
      highlights: [
        "استكشاف المعالم السياحية الشهيرة",
        "تجربة المأكولات المحلية اللذيذة",
        "الاستمتاع بتجارب ثقافية فريدة"
      ],
      bestTimeToVisit: "يعتمد على وجهتك المختارة",
      language: "اللغة المحلية للوجهة"
    },
    dailyPlan: Array.from({ length: (travelData.duration || 7) }, (_, i) => ({
      day: i + 1,
      activities: [
        { time: "09:00", description: "الإفطار في المطعم المحلي" },
        { time: "10:30", description: "زيارة معلم سياحي" },
        { time: "13:00", description: "الغداء في مطعم مشهور" },
        { time: "15:00", description: "وقت حر للتسوق أو الراحة" },
        { time: "19:00", description: "العشاء والاستمتاع بالترفيه المسائي" }
      ]
    })),
    accommodation: {
      recommendations: [
        {
          name: "فندق فاخر",
          description: "خيار فاخر مع إطلالات رائعة",
          priceRange: "مرتفع"
        },
        {
          name: "فندق متوسط المستوى",
          description: "خيار مريح بسعر معقول",
          priceRange: "متوسط"
        },
        {
          name: "نزل اقتصادي",
          description: "خيار ميزانية ممتاز للمسافرين الاقتصاديين",
          priceRange: "منخفض"
        }
      ]
    },
    budget: {
      estimated: travelData.budget,
      breakdown: {
        accommodation: Math.round(travelData.budget * 0.4),
        food: Math.round(travelData.budget * 0.2),
        activities: Math.round(travelData.budget * 0.15),
        transportation: Math.round(travelData.budget * 0.15),
        shopping: Math.round(travelData.budget * 0.1)
      },
      tips: [
        "احجز رحلتك مبكرًا للحصول على أفضل الأسعار",
        "استخدم وسائل النقل العام لتوفير المال",
        "ابحث عن خيارات تناول الطعام المحلية غير السياحية"
      ]
    }
  };
}

/**
 * تحسين خطة سفر باستخدام OpenAI API
 * @param {Object} travelPlan - خطة السفر الأولية
 * @returns {Promise<Object>} - خطة السفر المحسنة
 */
export async function enhanceTravelPlan(travelPlan) {
  try {
    const client = createOpenAIClient();
    
    // استخدام بيانات وهمية إذا لم يكن هناك عميل OpenAI
    if (!client) {
      console.log("استخدام بيانات وهمية للاختبار المحلي");
      // إضافة بعض التحسينات البسيطة للخطة الحالية
      const enhancedPlan = { ...travelPlan };
      enhancedPlan.tips = [
        ...(enhancedPlan.tips || []),
        "تأكد من حجز التذاكر للمعالم السياحية الشهيرة مسبقًا لتجنب الطوابير",
        "يمكنك استخدام تطبيق RTA للتنقل بالمواصلات العامة في دبي"
      ];
      return enhancedPlan;
    }
    
    // إنشاء نص التوجيه
    const prompt = `أنا خبير سفر، وأريد منك تحسين خطة السفر التالية وإضافة تفاصيل أكثر فائدة وتخصيصًا:
    
${JSON.stringify(travelPlan, null, 2)}

قم بتحسين الخطة من خلال:
1. إضافة نصائح محلية وثقافية أكثر تخصصًا
2. اقتراح أنشطة بديلة في حالة سوء الطقس
3. إضافة معلومات عن الأطعمة المحلية المميزة
4. تقديم نصائح للتنقل المحلي
5. إضافة معلومات عن العادات والتقاليد المحلية

أعد الخطة بنفس تنسيق JSON الأصلي مع الحفاظ على جميع المفاتيح الموجودة وإضافة المفاتيح الجديدة التالية:
- localTips: مصفوفة من النصائح المحلية
- weatherAlternatives: كائن يحتوي على أنشطة بديلة في حالة سوء الطقس
- localCuisine: مصفوفة من الأطعمة المحلية المميزة
- transportationTips: مصفوفة من نصائح التنقل المحلي
- culturalNotes: مصفوفة من ملاحظات ثقافية مهمة

أعد الخطة كاملة بتنسيق JSON فقط.`;

    // استدعاء OpenAI API
    const response = await client.chat.completions.create({
      messages: [
        { role: "system", content: "أنت مساعد سفر متخصص يقدم خطط سفر مفصلة ومخصصة." },
        { role: "user", content: prompt }
      ],
      model: "gpt-4o-mini",
      temperature: 0.7,
      max_tokens: 4096,
      top_p: 1
    });
    
    // استخراج النص المنشأ
    const generatedText = response.choices[0].message.content;
    console.log("Generated text from OpenAI:", generatedText.substring(0, 200) + "...");
    
    // محاولة تحليل النص إلى كائن JSON
    try {
      // استخراج JSON من النص (في حالة وجود نص إضافي)
      const jsonMatch = generatedText.match(/```json\s*([\s\S]*?)\s*```/) || 
                        generatedText.match(/```\s*([\s\S]*?)\s*```/) ||
                        generatedText.match(/\{[\s\S]*\}/);
      
      // إذا لم يتم العثور على JSON في النص، حاول تحليل النص كاملاً
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
      
      // محاولة تحليل JSON
      const enhancedPlan = JSON.parse(jsonString);
      return enhancedPlan;
    } catch (jsonError) {
      console.error("Error parsing JSON from OpenAI response:", jsonError);
      // في حالة فشل تحليل JSON، نعيد خطة السفر الأصلية
      return travelPlan;
    }
  } catch (error) {
    console.error("Error enhancing travel plan with OpenAI:", error);
    // في حالة حدوث خطأ، نعيد خطة السفر الأصلية مع بعض التحسينات البسيطة
    const enhancedPlan = { ...travelPlan };
    enhancedPlan.tips = [
      ...(enhancedPlan.tips || []),
      "تأكد من حجز التذاكر للمعالم السياحية الشهيرة مسبقًا لتجنب الطوابير"
    ];
    return enhancedPlan;
  }
}

/**
 * الحصول على اقتراحات أنشطة إضافية باستخدام OpenAI API
 * @param {Object} travelData - بيانات الرحلة
 * @returns {Promise<Array>} - مصفوفة من الأنشطة المقترحة
 */
export async function getSuggestedActivities(travelData) {
  try {
    const client = createOpenAIClient();
    
    // استخدام بيانات وهمية إذا لم يكن هناك عميل OpenAI
    if (!client) {
      console.log("استخدام بيانات وهمية للاختبار المحلي");
      return [
        {
          name: "رحلة بالمنطاد الهوائي",
          description: "استمتع بمنظر بانورامي للصحراء والمدينة من السماء",
          cost: "مرتفع",
          location: "صحراء دبي",
          category: "مغامرة"
        },
        {
          name: "جلسة يوغا على الشاطئ",
          description: "استرخاء وتأمل على شاطئ البحر عند الغروب",
          cost: "متوسط",
          location: "شاطئ جميرا",
          category: "استرخاء"
        },
        {
          name: "جولة طعام في المطاعم المحلية",
          description: "تذوق أشهى المأكولات العربية والعالمية مع مرشد محلي",
          cost: "متوسط",
          location: "مناطق متفرقة في دبي",
          category: "طعام"
        }
      ];
    }
    
    // إنشاء نص التوجيه
    const prompt = `اقترح 5 أنشطة فريدة وغير تقليدية في ${travelData.destination} تناسب ${travelData.travelType} لـ ${travelData.travelers} مسافر/مسافرين مع اهتمامات: ${travelData.interests}.
    
لكل نشاط، قدم المعلومات التالية:
1. اسم النشاط
2. وصف موجز
3. الموقع
4. المدة المقترحة
5. التكلفة التقريبية
6. أفضل وقت للقيام به
7. نصائح مفيدة

قدم الإجابة بتنسيق JSON كما يلي:
{
  "activities": [
    {
      "name": "اسم النشاط",
      "description": "وصف النشاط",
      "location": "الموقع",
      "duration": "المدة المقترحة",
      "cost": "التكلفة التقريبية",
      "bestTime": "أفضل وقت للقيام به",
      "tips": "نصائح مفيدة"
    }
  ]
}`;

    // استدعاء OpenAI API
    const response = await client.chat.completions.create({
      messages: [
        { role: "system", content: "أنت خبير سفر متخصص في اقتراح أنشطة فريدة وغير تقليدية." },
        { role: "user", content: prompt }
      ],
      model: "gpt-4o-mini",
      temperature: 0.8,
      max_tokens: 2048,
      top_p: 1
    });
    
    // استخراج النص المنشأ
    const generatedText = response.choices[0].message.content;
    
    // محاولة تحليل النص إلى كائن JSON
    try {
      // استخراج JSON من النص (في حالة وجود نص إضافي)
      const jsonMatch = generatedText.match(/```json\s*([\s\S]*?)\s*```/) || 
                        generatedText.match(/```\s*([\s\S]*?)\s*```/) ||
                        generatedText.match(/\{[\s\S]*\}/);
      
      // إذا لم يتم العثور على JSON في النص، حاول تحليل النص كاملاً
      let jsonString = jsonMatch ? jsonMatch[1] || jsonMatch[0] : generatedText;
      
      // تنظيف النص قبل التحليل
      jsonString = jsonString
        .replace(/,\s*}/g, '}')
        .replace(/,\s*]/g, ']')
        .replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2":')
        .replace(/:\s*(['"])([^'"]*?)(['"])\s*([,}])/g, ':"$2"$4')
        .replace(/:\s*'([^']*)'\s*([,}])/g, ':"$1"$2')
        .replace(/\n/g, ' ')
        .replace(/\r/g, ' ')
        .replace(/\t/g, ' ')
        .replace(/\\/g, '\\\\');
      
      // محاولة تحليل JSON
      const suggestedActivities = JSON.parse(jsonString);
      return suggestedActivities.activities || [];
    } catch (jsonError) {
      console.error("Error parsing JSON from OpenAI response:", jsonError);
      // في حالة فشل تحليل JSON، نعيد مصفوفة فارغة
      return [];
    }
  } catch (error) {
    console.error("Error getting suggested activities with OpenAI:", error);
    // في حالة حدوث خطأ، نعيد بعض الأنشطة الوهمية
    return [
      {
        name: "رحلة بالمنطاد الهوائي",
        description: "استمتع بمنظر بانورامي للصحراء والمدينة من السماء",
        cost: "مرتفع",
        location: "صحراء دبي",
        category: "مغامرة"
      },
      {
        name: "جلسة يوغا على الشاطئ",
        description: "استرخاء وتأمل على شاطئ البحر عند الغروب",
        cost: "متوسط",
        location: "شاطئ جميرا",
        category: "استرخاء"
      }
    ];
  }
}

/**
 * الحصول على إجابات لأسئلة السفر باستخدام OpenAI API
 * @param {string} question - سؤال المستخدم
 * @param {Object} travelPlan - خطة السفر الحالية (اختياري)
 * @returns {Promise<string>} - الإجابة على السؤال
 */
export async function answerTravelQuestion(question, travelPlan = null) {
  try {
    const client = createOpenAIClient();
    
    // استخدام إجابات وهمية إذا لم يكن هناك عميل OpenAI
    if (!client) {
      console.log("استخدام بيانات وهمية للاختبار المحلي");
      const mockAnswers = {
        "ما هي أفضل وقت لزيارة دبي؟": "أفضل وقت لزيارة دبي هو بين نوفمبر وأبريل عندما يكون الطقس معتدلًا ومناسبًا للأنشطة الخارجية. يجب تجنب أشهر الصيف (يونيو إلى سبتمبر) حيث ترتفع درجات الحرارة بشكل كبير.",
        "كيف يمكنني التنقل في دبي؟": "يمكنك التنقل في دبي باستخدام مترو دبي، والحافلات، وسيارات الأجرة، أو تطبيقات طلب السيارات مثل أوبر وكريم. مترو دبي هو وسيلة فعالة من حيث التكلفة للتنقل بين المعالم السياحية الرئيسية.",
        "ما هي العملة المستخدمة في دبي؟": "العملة المستخدمة في دبي هي الدرهم الإماراتي (AED). يمكنك تبديل العملات في المطار، البنوك، أو مراكز الصرافة المنتشرة في المدينة."
      };
      
      // البحث عن إجابة مطابقة أو إرجاع إجابة افتراضية
      for (const [q, a] of Object.entries(mockAnswers)) {
        if (question.toLowerCase().includes(q.toLowerCase())) {
          return a;
        }
      }
      return "يمكنني مساعدتك في التخطيط لرحلتك إلى دبي. يرجى طرح أسئلة محددة عن الأماكن السياحية، الطعام، الإقامة، أو أي جانب آخر من جوانب السفر.";
    }
    
    // إنشاء نص التوجيه
    let prompt = `أجب على السؤال التالي المتعلق بالسفر بشكل مفصل ومفيد:\n\n${question}`;
    
    // إذا كانت خطة السفر متوفرة، أضفها إلى التوجيه
    if (travelPlan) {
      prompt += `\n\nخطة السفر الحالية:\n${JSON.stringify(travelPlan, null, 2)}`;
    }
    
    // استدعاء OpenAI API
    const response = await client.chat.completions.create({
      messages: [
        { role: "system", content: "أنت مساعد سفر متخصص يقدم إجابات دقيقة ومفيدة لأسئلة السفر." },
        { role: "user", content: prompt }
      ],
      model: "gpt-4o-mini",
      temperature: 0.7,
      max_tokens: 1024,
      top_p: 1
    });
    
    // استخراج النص المنشأ
    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error answering travel question with OpenAI:", error);
    return "عذرًا، لم أتمكن من معالجة سؤالك في الوقت الحالي. يرجى المحاولة مرة أخرى لاحقًا.";
  }
}
