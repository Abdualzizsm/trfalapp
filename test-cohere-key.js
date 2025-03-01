// سكريبت اختبار مفتاح Cohere API
require('dotenv').config({ path: '.env.local' });
const { CohereClient } = require('cohere-ai');

async function testCohereKey() {
  try {
    console.log('بدء اختبار مفتاح Cohere API...');
    
    // التحقق من وجود مفتاح API
    if (!process.env.COHERE_API_KEY) {
      throw new Error('مفتاح Cohere API غير موجود في ملف .env.local');
    }
    
    console.log('تم العثور على مفتاح API');
    
    // إنشاء عميل Cohere
    const cohere = new CohereClient({
      token: process.env.COHERE_API_KEY,
    });
    
    // إرسال طلب بسيط للتحقق من صحة المفتاح
    const response = await cohere.generate({
      prompt: 'اكتب جملة قصيرة عن السفر',
      model: 'command',
      maxTokens: 50,
      temperature: 0.7,
    });
    
    console.log('تم استلام استجابة من Cohere API:');
    console.log(response.generations[0].text);
    console.log('اختبار ناجح! المفتاح يعمل بشكل صحيح.');
    
  } catch (error) {
    console.error('حدث خطأ أثناء اختبار مفتاح Cohere API:');
    console.error(error.message);
    
    if (error.message.includes('401')) {
      console.error('خطأ 401: المفتاح غير صالح أو منتهي الصلاحية.');
    } else if (error.message.includes('403')) {
      console.error('خطأ 403: ليس لديك إذن للوصول إلى هذا المورد.');
    }
  }
}

// تنفيذ الاختبار
testCohereKey();
